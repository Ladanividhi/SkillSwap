import 'package:flutter/material.dart';
import '../models/user_model.dart';
import 'package:skill_swap_platform/services/auth_services.dart';

class UserDetailScreen extends StatefulWidget {
  final User user;

  UserDetailScreen({required this.user});

  @override
  _UserDetailScreenState createState() => _UserDetailScreenState();
}

class _UserDetailScreenState extends State<UserDetailScreen> {
  final AuthService _authService = AuthService();
  final _messageController = TextEditingController();
  String? _selectedSkillOffered;
  String? _selectedSkillWanted;
  bool _isLoading = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.user.name),
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
                    radius: 50,
                    backgroundColor: Colors.blue[100],
                    child: Text(
                      widget.user.name.substring(0, 2).toUpperCase(),
                      style: TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                        color: Colors.blue[800],
                      ),
                    ),
                  ),
                  SizedBox(height: 16),
                  Text(
                    widget.user.name,
                    style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  if (widget.user.location != null)
                    Text(
                      widget.user.location!,
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
                        '${widget.user.rating} (${widget.user.totalSwaps} swaps)',
                        style: TextStyle(fontSize: 16),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            
            SizedBox(height: 32),
            
            // Skills Offered
            _buildSkillSection(
              'Skills Offered',
              widget.user.skillsOffered,
              Colors.green,
            ),
            
            SizedBox(height: 24),
            
            // Skills Wanted
            _buildSkillSection(
              'Skills Wanted',
              widget.user.skillsWanted,
              Colors.orange,
            ),
            
            SizedBox(height: 24),
            
            // Availability
            Card(
              child: Padding(
                padding: EdgeInsets.all(16),
                child: Row(
                  children: [
                    Icon(Icons.schedule, color: Colors.blue),
                    SizedBox(width: 12),
                    Text(
                      'Available: ${widget.user.availability}',
                      style: TextStyle(fontSize: 16),
                    ),
                  ],
                ),
              ),
            ),
            
            SizedBox(height: 32),
            
            // Swap Request Form
            Card(
              child: Padding(
                padding: EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Send Swap Request',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    SizedBox(height: 16),
                    
                    // Select skill you want
                    DropdownButtonFormField<String>(
                      decoration: InputDecoration(
                        labelText: 'Skill you want to learn',
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(8),
                        ),
                      ),
                      items: widget.user.skillsOffered.map((skill) {
                        return DropdownMenuItem(
                          value: skill,
                          child: Text(skill),
                        );
                      }).toList(),
                      onChanged: (value) {
                        setState(() => _selectedSkillWanted = value);
                      },
                    ),
                    
                    SizedBox(height: 16),
                    
                    // Select skill you offer
                    DropdownButtonFormField<String>(
                      decoration: InputDecoration(
                        labelText: 'Skill you can teach',
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(8),
                        ),
                      ),
                      items: widget.user.skillsWanted.map((skill) {
                        return DropdownMenuItem(
                          value: skill,
                          child: Text(skill),
                        );
                      }).toList(),
                      onChanged: (value) {
                        setState(() => _selectedSkillOffered = value);
                      },
                    ),
                    
                    SizedBox(height: 16),
                    
                    // Message
                    TextField(
                      controller: _messageController,
                      maxLines: 3,
                      decoration: InputDecoration(
                        labelText: 'Message (optional)',
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(8),
                        ),
                      ),
                    ),
                    
                    SizedBox(height: 16),
                    
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton(
                        onPressed: _canSendRequest() ? _sendSwapRequest : null,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.blue,
                          foregroundColor: Colors.white,
                          padding: EdgeInsets.symmetric(vertical: 16),
                        ),
                        child: _isLoading
                            ? CircularProgressIndicator(color: Colors.white)
                            : Text('Send Swap Request'),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSkillSection(String title, List<String> skills, MaterialColor color) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
        ),
        SizedBox(height: 8),
        Wrap(
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
    );
  }

  bool _canSendRequest() {
    return _selectedSkillOffered != null && 
           _selectedSkillWanted != null && 
           !_isLoading;
  }

  _sendSwapRequest() async {
    setState(() => _isLoading = true);
    
    try {
      final currentUser = await _authService.getCurrentUser();
      if (currentUser == null) return;
      
      final request = SwapRequest(
        id: DateTime.now().millisecondsSinceEpoch.toString(),
        fromUserId: currentUser.id,
        toUserId: widget.user.id,
        fromUserName: currentUser.name,
        toUserName: widget.user.name,
        skillOffered: _selectedSkillOffered!,
        skillWanted: _selectedSkillWanted!,
        status: 'pending',
        createdAt: DateTime.now(),
        message: _messageController.text.isNotEmpty ? _messageController.text : null,
      );
      
      await _authService.sendSwapRequest(request);
      
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Swap request sent successfully!')),
      );
      
      Navigator.pop(context);
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Failed to send request. Please try again.')),
      );
    } finally {
      setState(() => _isLoading = false);
    }
  }

  @override
  void dispose() {
    _messageController.dispose();
    super.dispose();
  }
}