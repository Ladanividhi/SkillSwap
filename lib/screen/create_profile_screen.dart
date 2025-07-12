import 'package:flutter/material.dart';
import '../models/user_model.dart';
import 'package:skill_swap_platform/services/auth_services.dart';

class CreateProfileScreen extends StatefulWidget {
  @override
  _CreateProfileScreenState createState() => _CreateProfileScreenState();
}

class _CreateProfileScreenState extends State<CreateProfileScreen> {
  final AuthService _authService = AuthService();
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _locationController = TextEditingController();
  final _skillOfferedController = TextEditingController();
  final _skillWantedController = TextEditingController();
  
  List<String> _skillsOffered = [];
  List<String> _skillsWanted = [];
  String _selectedAvailability = 'Weekends';
  bool _isPublic = true;
  bool _isLoading = false;
  User? _currentUser;

  final List<String> _availabilityOptions = [
    'Weekends',
    'Evenings',
    'Weekdays',
    'Flexible',
  ];

  final List<String> _popularSkills = [
    'Photoshop', 'UI Design', 'Flutter', 'React', 'Node.js', 'Python',
    'Excel', 'Data Analysis', 'Web Design', 'Marketing', 'Photography',
    'Video Editing', 'Graphic Design', 'JavaScript', 'Java', 'C++',
    'Machine Learning', 'Digital Marketing', 'Content Writing', 'SEO',
    'Project Management', 'Public Speaking', 'Language Translation',
    'Music Production', 'Animation', 'Game Development', 'DevOps',
    'Cloud Computing', 'Cybersecurity', 'Mobile Development',
  ];

  @override
  void initState() {
    super.initState();
    _loadCurrentUser();
  }

  _loadCurrentUser() async {
    final user = await _authService.getCurrentUser();
    if (user != null) {
      setState(() {
        _currentUser = user;
        _nameController.text = user.name;
        _locationController.text = user.location ?? '';
        _skillsOffered = List.from(user.skillsOffered);
        _skillsWanted = List.from(user.skillsWanted);
        _selectedAvailability = user.availability;
        _isPublic = user.isPublic;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(_currentUser == null ? 'Create Profile' : 'Edit Profile'),
      ),
      body: Form(
        key: _formKey,
        child: SingleChildScrollView(
          padding: EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Basic Info Section
              Text(
                'Basic Information',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 16),
              
              TextFormField(
                controller: _nameController,
                decoration: InputDecoration(
                  labelText: 'Full Name',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                  prefixIcon: Icon(Icons.person),
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter your name';
                  }
                  return null;
                },
              ),
              
              SizedBox(height: 16),
              
              TextFormField(
                controller: _locationController,
                decoration: InputDecoration(
                  labelText: 'Location (Optional)',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                  prefixIcon: Icon(Icons.location_on),
                ),
              ),
              
              SizedBox(height: 24),
              
              // Skills Offered Section
              Text(
                'Skills I Can Teach',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 8),
              Text(
                'Add skills you can teach others',
                style: TextStyle(color: Colors.grey[600]),
              ),
              SizedBox(height: 16),
              
              _buildSkillInput(
                controller: _skillOfferedController,
                hintText: 'Enter a skill you can teach',
                onAdd: _addSkillOffered,
              ),
              
              SizedBox(height: 8),
              _buildSkillChips(_skillsOffered, _removeSkillOffered, Colors.green),
              
              SizedBox(height: 8),
              _buildPopularSkillsSection(true),
              
              SizedBox(height: 24),
              
              // Skills Wanted Section
              Text(
                'Skills I Want to Learn',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 8),
              Text(
                'Add skills you want to learn from others',
                style: TextStyle(color: Colors.grey[600]),
              ),
              SizedBox(height: 16),
              
              _buildSkillInput(
                controller: _skillWantedController,
                hintText: 'Enter a skill you want to learn',
                onAdd: _addSkillWanted,
              ),
              
              SizedBox(height: 8),
              _buildSkillChips(_skillsWanted, _removeSkillWanted, Colors.orange),
              
              SizedBox(height: 8),
              _buildPopularSkillsSection(false),
              
              SizedBox(height: 24),
              
              // Availability Section
              Text(
                'Availability',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 16),
              
              DropdownButtonFormField<String>(
                value: _selectedAvailability,
                decoration: InputDecoration(
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                  prefixIcon: Icon(Icons.schedule),
                ),
                items: _availabilityOptions.map((availability) {
                  return DropdownMenuItem(
                    value: availability,
                    child: Text(availability),
                  );
                }).toList(),
                onChanged: (value) {
                  setState(() => _selectedAvailability = value!);
                },
              ),
              
              SizedBox(height: 24),
              
              // Privacy Section
              Card(
                child: Padding(
                  padding: EdgeInsets.all(16),
                  child: Row(
                    children: [
                      Icon(
                        _isPublic ? Icons.public : Icons.lock,
                        color: _isPublic ? Colors.green : Colors.red,
                      ),
                      SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Profile Visibility',
                              style: TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            Text(
                              _isPublic 
                                ? 'Your profile is visible to all users'
                                : 'Your profile is private',
                              style: TextStyle(color: Colors.grey[600]),
                            ),
                          ],
                        ),
                      ),
                      Switch(
                        value: _isPublic,
                        onChanged: (value) {
                          setState(() => _isPublic = value);
                        },
                      ),
                    ],
                  ),
                ),
              ),
              
              SizedBox(height: 32),
              
              // Save Button
              SizedBox(
                width: double.infinity,
                height: 50,
                child: ElevatedButton(
                  onPressed: _isLoading ? null : _saveProfile,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.blue,
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  child: _isLoading
                      ? CircularProgressIndicator(color: Colors.white)
                      : Text(
                          _currentUser == null ? 'Create Profile' : 'Update Profile',
                          style: TextStyle(fontSize: 16),
                        ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSkillInput({
    required TextEditingController controller,
    required String hintText,
    required VoidCallback onAdd,
  }) {
    return Row(
      children: [
        Expanded(
          child: TextField(
            controller: controller,
            decoration: InputDecoration(
              hintText: hintText,
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
              ),
            ),
            onSubmitted: (_) => onAdd(),
          ),
        ),
        SizedBox(width: 8),
        ElevatedButton(
          onPressed: onAdd,
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.blue,
            foregroundColor: Colors.white,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
            ),
          ),
          child: Text('Add'),
        ),
      ],
    );
  }

  Widget _buildSkillChips(List<String> skills, Function(String) onRemove, MaterialColor color) {
    if (skills.isEmpty) {
      return Container(
        width: double.infinity,
        padding: EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.grey[100],
          borderRadius: BorderRadius.circular(8),
          border: Border.all(color: Colors.grey[300]!),
        ),
        child: Text(
          'No skills added yet',
          style: TextStyle(
            color: Colors.grey[600],
            fontStyle: FontStyle.italic,
          ),
          textAlign: TextAlign.center,
        ),
      );
    }

    return Wrap(
      spacing: 8,
      runSpacing: 8,
      children: skills.map((skill) {
        return Chip(
          label: Text(skill),
          backgroundColor: color[100],
          labelStyle: TextStyle(color: color[800]),
          deleteIcon: Icon(Icons.close, size: 18),
          onDeleted: () => onRemove(skill),
        );
      }).toList(),
    );
  }

  Widget _buildPopularSkillsSection(bool isOffered) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Popular Skills:',
          style: TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.w500,
            color: Colors.grey[700],
          ),
        ),
        SizedBox(height: 8),
        Wrap(
          spacing: 6,
          runSpacing: 6,
          children: _popularSkills.map((skill) {
            final isAlreadyAdded = isOffered 
              ? _skillsOffered.contains(skill)
              : _skillsWanted.contains(skill);
            
            return GestureDetector(
              onTap: isAlreadyAdded ? null : () {
                if (isOffered) {
                  _addSkillOfferedDirect(skill);
                } else {
                  _addSkillWantedDirect(skill);
                }
              },
              child: Container(
                padding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: isAlreadyAdded ? Colors.grey[300] : Colors.blue[50],
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(
                    color: isAlreadyAdded ? Colors.grey[400]! : Colors.blue[200]!,
                  ),
                ),
                child: Text(
                  skill,
                  style: TextStyle(
                    fontSize: 12,
                    color: isAlreadyAdded ? Colors.grey[600] : Colors.blue[800],
                  ),
                ),
              ),
            );
          }).toList(),
        ),
      ],
    );
  }

  _addSkillOffered() {
    final skill = _skillOfferedController.text.trim();
    if (skill.isNotEmpty && !_skillsOffered.contains(skill)) {
      setState(() {
        _skillsOffered.add(skill);
        _skillOfferedController.clear();
      });
    }
  }

  _addSkillOfferedDirect(String skill) {
    if (!_skillsOffered.contains(skill)) {
      setState(() => _skillsOffered.add(skill));
    }
  }

  _addSkillWanted() {
    final skill = _skillWantedController.text.trim();
    if (skill.isNotEmpty && !_skillsWanted.contains(skill)) {
      setState(() {
        _skillsWanted.add(skill);
        _skillWantedController.clear();
      });
    }
  }

  _addSkillWantedDirect(String skill) {
    if (!_skillsWanted.contains(skill)) {
      setState(() => _skillsWanted.add(skill));
    }
  }

  _removeSkillOffered(String skill) {
    setState(() => _skillsOffered.remove(skill));
  }

  _removeSkillWanted(String skill) {
    setState(() => _skillsWanted.remove(skill));
  }

  _saveProfile() async {
    if (_formKey.currentState!.validate()) {
      setState(() => _isLoading = true);
      
      try {
        final user = User(
          id: _currentUser?.id ?? DateTime.now().millisecondsSinceEpoch.toString(),
          name: _nameController.text,
          email: _currentUser?.email ?? '',
          location: _locationController.text.isNotEmpty ? _locationController.text : null,
          skillsOffered: _skillsOffered,
          skillsWanted: _skillsWanted,
          availability: _selectedAvailability,
          isPublic: _isPublic,
          rating: _currentUser?.rating ?? 0.0,
          totalSwaps: _currentUser?.totalSwaps ?? 0,
        );
        
        await _authService.updateUserProfile(user);
        
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Profile saved successfully!')),
        );
        
        Navigator.pushReplacementNamed(context, '/home');
      } catch (e) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to save profile. Please try again.')),
        );
      } finally {
        setState(() => _isLoading = false);
      }
    }
  }

  @override
  void dispose() {
    _nameController.dispose();
    _locationController.dispose();
    _skillOfferedController.dispose();
    _skillWantedController.dispose();
    super.dispose();
  }
}