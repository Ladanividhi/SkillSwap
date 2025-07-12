import 'package:flutter/material.dart';
import '../models/user_model.dart';
import 'package:skill_swap_platform/services/auth_services.dart';
import 'user_detail_screen.dart';

class HomeScreen extends StatefulWidget {
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final AuthService _authService = AuthService();
  final TextEditingController _searchController = TextEditingController();
  List<User> _users = [];
  List<User> _filteredUsers = [];
  bool _isLoading = true;
  String _selectedAvailability = 'All';

  @override
  void initState() {
    super.initState();
    _loadUsers();
  }

  _loadUsers() async {
    setState(() => _isLoading = true);
    try {
      final users = await _authService.getAllUsers();
      setState(() {
        _users = users;
        _filteredUsers = users;
        _isLoading = false;
      });
    } catch (e) {
      setState(() => _isLoading = false);
    }
  }

  _searchUsers(String query) async {
    if (query.isEmpty) {
      setState(() => _filteredUsers = _users);
      return;
    }

    final results = await _authService.searchUsers(query);
    setState(() => _filteredUsers = results);
  }

  _filterByAvailability(String availability) {
    setState(() {
      _selectedAvailability = availability;
      if (availability == 'All') {
        _filteredUsers = _users;
      } else {
        _filteredUsers = _users.where((user) => 
          user.availability == availability).toList();
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Skill Swap Platform'),
        actions: [
          IconButton(
            icon: Icon(Icons.notifications),
            onPressed: () => Navigator.pushNamed(context, '/swap-requests'),
          ),
          IconButton(
            icon: Icon(Icons.person),
            onPressed: () => Navigator.pushNamed(context, '/profile'),
          ),
        ],
      ),
      body: Column(
        children: [
          // Search Bar
          Padding(
            padding: EdgeInsets.all(16),
            child: TextField(
              controller: _searchController,
              decoration: InputDecoration(
                hintText: 'Search by skill (e.g., Photoshop, Excel)',
                prefixIcon: Icon(Icons.search),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
              onChanged: _searchUsers,
            ),
          ),
          
          // Availability Filter
          Container(
            height: 50,
            child: ListView(
              scrollDirection: Axis.horizontal,
              padding: EdgeInsets.symmetric(horizontal: 16),
              children: ['All', 'Weekends', 'Evenings', 'Weekdays'].map((availability) {
                return Padding(
                  padding: EdgeInsets.only(right: 8),
                  child: FilterChip(
                    label: Text(availability),
                    selected: _selectedAvailability == availability,
                    onSelected: (_) => _filterByAvailability(availability),
                    selectedColor: Colors.blue[100],
                  ),
                );
              }).toList(),
            ),
          ),
          
          // Users List
          Expanded(
            child: _isLoading
                ? Center(child: CircularProgressIndicator())
                : _filteredUsers.isEmpty
                    ? Center(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(Icons.search_off, size: 64, color: Colors.grey),
                            SizedBox(height: 16),
                            Text('No users found', style: TextStyle(fontSize: 18, color: Colors.grey)),
                          ],
                        ),
                      )
                    : ListView.builder(
                        padding: EdgeInsets.all(16),
                        itemCount: _filteredUsers.length,
                        itemBuilder: (context, index) {
                          final user = _filteredUsers[index];
                          return _buildUserCard(user);
                        },
                      ),
          ),
        ],
      ),
    );
  }

  Widget _buildUserCard(User user) {
    return Card(
      margin: EdgeInsets.only(bottom: 16),
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                CircleAvatar(
                  radius: 30,
                  backgroundColor: Colors.blue[100],
                  child: Text(
                    user.name.substring(0, 2).toUpperCase(),
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      color: Colors.blue[800],
                    ),
                  ),
                ),
                SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        user.name,
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      if (user.location != null)
                        Text(
                          user.location!,
                          style: TextStyle(color: Colors.grey[600]),
                        ),
                      Row(
                        children: [
                          Icon(Icons.star, size: 16, color: Colors.amber),
                          SizedBox(width: 4),
                          Text('${user.rating} (${user.totalSwaps} swaps)'),
                        ],
                      ),
                    ],
                  ),
                ),
                ElevatedButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => UserDetailScreen(user: user),
                      ),
                    );
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.blue,
                    foregroundColor: Colors.white,
                  ),
                  child: Text('Request'),
                ),
              ],
            ),
            SizedBox(height: 12),
            
            // Skills Offered
            Text(
              'Skills Offered:',
              style: TextStyle(fontWeight: FontWeight.w600),
            ),
            SizedBox(height: 4),
            Wrap(
              spacing: 8,
              runSpacing: 4,
              children: user.skillsOffered.map((skill) {
                return Chip(
                  label: Text(skill, style: TextStyle(fontSize: 12)),
                  backgroundColor: Colors.green[100],
                  labelStyle: TextStyle(color: Colors.green[800]),
                );
              }).toList(),
            ),
            
            SizedBox(height: 8),
            
            // Skills Wanted
            Text(
              'Skills Wanted:',
              style: TextStyle(fontWeight: FontWeight.w600),
            ),
            SizedBox(height: 4),
            Wrap(
              spacing: 8,
              runSpacing: 4,
              children: user.skillsWanted.map((skill) {
                return Chip(
                  label: Text(skill, style: TextStyle(fontSize: 12)),
                  backgroundColor: Colors.orange[100],
                  labelStyle: TextStyle(color: Colors.orange[800]),
                );
              }).toList(),
            ),
            
            SizedBox(height: 8),
            Text(
              'Available: ${user.availability}',
              style: TextStyle(
                color: Colors.grey[600],
                fontStyle: FontStyle.italic,
              ),
            ),
          ],
        ),
      ),
    );
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }
}