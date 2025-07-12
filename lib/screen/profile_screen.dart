import 'package:flutter/material.dart';
import '../models/user_model.dart';
import 'package:skill_swap_platform/services/auth_services.dart';

class ProfileScreen extends StatefulWidget {
  @override
  _ProfileScreenState createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  final AuthService _authService = AuthService();
  User? _currentUser;
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadCurrentUser();
  }

  _loadCurrentUser() async {
    setState(() => _isLoading = true);
    try {
      final user = await _authService.getCurrentUser();
      setState(() {
        _currentUser = user;
        _isLoading = false;
      });
    } catch (e) {
      setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return Scaffold(
        appBar: AppBar(title: Text('Profile')),
        body: Center(child: CircularProgressIndicator()),
      );
    }

    if (_currentUser == null) {
      return Scaffold(
        appBar: AppBar(title: Text('Profile')),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text('Please log in to view your profile'),
              SizedBox(height: 16),
              ElevatedButton(
                onPressed: () => Navigator.pushReplacementNamed(context, '/login'),
                child: Text('Login'),
              ),
            ],
          ),
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: Text('My Profile'),
        actions: [
          IconButton(
            icon: Icon(Icons.edit),
            onPressed: () => Navigator.pushNamed(context, '/create-profile'),
          ),
          PopupMenuButton(
            itemBuilder: (context) => [
              PopupMenuItem(
                child: Text('Logout'),
                onTap: _logout,
              ),
            ],
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Profile Header
            Center(
              child: Column(
                children: [
                  CircleAvatar(
                    radius: 60,
                    backgroundColor: Colors.blue[100],
                    child: Text(
                      _currentUser!.name.substring(0, 2).toUpperCase(),
                      style: TextStyle(
                        fontSize: 28,
                        fontWeight: FontWeight.bold,
                        color: Colors.blue[800],
                      ),
                    ),
                  ),
                  SizedBox(height: 16),
                  Text(
                    _currentUser!.name,
                    style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  Text(
                    _currentUser!.email,
                    style: TextStyle(
                      fontSize: 16,
                      color: Colors.grey[600],
                    ),
                  ),
                  if (_currentUser!.location != null)
                    Text(
                      _currentUser!.location!,
                      style: TextStyle(
                        fontSize: 16,
                        color: Colors.grey[600],
                      ),
                    ),
                  SizedBox(height: 8),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(Icons.star, color: Colors.amber),
                      SizedBox(width: 4),
                      Text(
                        '${_currentUser!.rating} (${_currentUser!.totalSwaps} swaps)',
                        style: TextStyle(fontSize: 16),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            
            SizedBox(height: 32),
            
            // Profile Status
            Card(
              child: Padding(
                padding: EdgeInsets.all(16),
                child: Row(
                  children: [
                    Icon(
                      _currentUser!.isPublic ? Icons.public : Icons.lock,
                      color: _currentUser!.isPublic ? Colors.green : Colors.red,
                    ),
                    SizedBox(width: 12),
                    Text(
                      _currentUser!.isPublic ? 'Profile is Public' : 'Profile is Private',
                      style: TextStyle(fontSize: 16),
                    ),
                    Spacer(),
                    Switch(
                      value: _currentUser!.isPublic,
                      onChanged: _toggleProfileVisibility,
                    ),
                  ],
                ),
              ),
            ),
            
            SizedBox(height: 16),
            
            // Skills Offered
            _buildSkillSection(
              'Skills I Offer',
              _currentUser!.skillsOffered,
              Colors.green,
              Icons.school,
            ),
            
            SizedBox(height: 16),
            
            // Skills Wanted
            _buildSkillSection(
              'Skills I Want to Learn',
              _currentUser!.skillsWanted,
              Colors.orange,
              Icons.lightbulb,
            ),
            
            SizedBox(height: 16),
            
            // Availability
            Card(
              child: Padding(
                padding: EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Icon(Icons.schedule, color: Colors.blue),
                        SizedBox(width: 12),
                        Text(
                          'Availability',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                    SizedBox(height: 8),
                    Text(
                      _currentUser!.availability,
                      style: TextStyle(fontSize: 16),
                    ),
                  ],
                ),
              ),
            ),
            
            SizedBox(height: 24),
            
            // Action Buttons
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () => Navigator.pushNamed(context, '/create-profile'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.blue,
                  foregroundColor: Colors.white,
                  padding: EdgeInsets.symmetric(vertical: 16),
                ),
                child: Text('Edit Profile'),
              ),
            ),
            
            SizedBox(height: 12),
            
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () => Navigator.pushNamed(context, '/swap-requests'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.green,
                  foregroundColor: Colors.white,
                  padding: EdgeInsets.symmetric(vertical: 16),
                ),
                child: Text('View Swap Requests'),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSkillSection(String title, List<String> skills, MaterialColor color, IconData icon) {
    return Card(
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(icon, color: color),
                SizedBox(width: 12),
                Text(
                  title,
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
            SizedBox(height: 12),
            skills.isEmpty
                ? Text(
                    'No skills added yet',
                    style: TextStyle(
                      color: Colors.grey[600],
                      fontStyle: FontStyle.italic,
                    ),
                  )
                : Wrap(
                    spacing: 8,
                    runSpacing: 8,
                    children: skills.map((skill) {
                      return Chip(
                        label: Text(skill),
                        backgroundColor: color[100],
                        labelStyle: TextStyle(color: color[800]),
                      );
                    }).toList(),
                  ),
          ],
        ),
      ),
    );
  }

  _toggleProfileVisibility(bool isPublic) async {
    final updatedUser = User(
      id: _currentUser!.id,
      name: _currentUser!.name,
      email: _currentUser!.email,
      location: _currentUser!.location,
      profilePhoto: _currentUser!.profilePhoto,
      skillsOffered: _currentUser!.skillsOffered,
      skillsWanted: _currentUser!.skillsWanted,
      availability: _currentUser!.availability,
      isPublic: isPublic,
      rating: _currentUser!.rating,
      totalSwaps: _currentUser!.totalSwaps,
    );

    try {
      await _authService.updateUserProfile(updatedUser);
      setState(() => _currentUser = updatedUser);
      
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(isPublic 
            ? 'Profile is now public' 
            : 'Profile is now private'),
        ),
      );
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Failed to update profile visibility')),
      );
    }
  }

  _logout() async {
    await _authService.logout();
    Navigator.pushReplacementNamed(context, '/login');
  }
}