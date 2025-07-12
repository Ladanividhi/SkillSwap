import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:skill_swap_platform/models/user_model.dart';

class AuthService {
  static const String _userKey = 'current_user';
  static const String _usersKey = 'all_users';
  static const String _swapRequestsKey = 'swap_requests';

  // Mock users for demo
  static List<User> _mockUsers = [
    User(
      id: '1',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      location: 'New York',
      skillsOffered: ['Photoshop', 'UI Design', 'Illustration'],
      skillsWanted: ['Flutter', 'React', 'Node.js'],
      availability: 'Weekends',
      isPublic: true,
      rating: 4.8,
      totalSwaps: 12,
    ),
    User(
      id: '2',
      name: 'Bob Smith',
      email: 'bob@example.com',
      location: 'San Francisco',
      skillsOffered: ['Flutter', 'React Native', 'Firebase'],
      skillsWanted: ['UI Design', 'Photoshop'],
      availability: 'Evenings',
      isPublic: true,
      rating: 4.6,
      totalSwaps: 8,
    ),
    User(
      id: '3',
      name: 'Carol Davis',
      email: 'carol@example.com',
      location: 'London',
      skillsOffered: ['Excel', 'Data Analysis', 'Python'],
      skillsWanted: ['Web Design', 'Marketing'],
      availability: 'Weekends',
      isPublic: true,
      rating: 4.9,
      totalSwaps: 15,
    ),
  ];

  static List<SwapRequest> _mockSwapRequests = [];

  Future<User?> getCurrentUser() async {
    final prefs = await SharedPreferences.getInstance();
    final userJson = prefs.getString(_userKey);
    if (userJson != null) {
      return User.fromJson(json.decode(userJson));
    }
    return null;
  }

  Future<bool> login(String email, String password) async {
    // Mock login - in real app, this would call an API
    await Future.delayed(Duration(seconds: 1));
    
    final user = _mockUsers.firstWhere(
      (u) => u.email == email,
      orElse: () => User(
        id: DateTime.now().millisecondsSinceEpoch.toString(),
        name: 'Demo User',
        email: email,
        skillsOffered: [],
        skillsWanted: [],
        availability: 'Weekends',
        isPublic: true,
      ),
    );

    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_userKey, json.encode(user.toJson()));
    return true;
  }

  Future<bool> register(String name, String email, String password) async {
    await Future.delayed(Duration(seconds: 1));
    
    final user = User(
      id: DateTime.now().millisecondsSinceEpoch.toString(),
      name: name,
      email: email,
      skillsOffered: [],
      skillsWanted: [],
      availability: 'Weekends',
      isPublic: true,
    );

    _mockUsers.add(user);
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_userKey, json.encode(user.toJson()));
    return true;
  }

  Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_userKey);
  }

  Future<List<User>> getAllUsers() async {
    await Future.delayed(Duration(milliseconds: 500));
    return _mockUsers.where((u) => u.isPublic).toList();
  }

  Future<List<User>> searchUsers(String query) async {
    await Future.delayed(Duration(milliseconds: 300));
    return _mockUsers.where((user) {
      return user.isPublic && 
             (user.skillsOffered.any((skill) => 
               skill.toLowerCase().contains(query.toLowerCase())) ||
              user.name.toLowerCase().contains(query.toLowerCase()));
    }).toList();
  }

  Future<void> sendSwapRequest(SwapRequest request) async {
    await Future.delayed(Duration(milliseconds: 500));
    _mockSwapRequests.add(request);
  }

  Future<List<SwapRequest>> getSwapRequests(String userId) async {
    await Future.delayed(Duration(milliseconds: 300));
    return _mockSwapRequests.where((req) => 
      req.fromUserId == userId || req.toUserId == userId).toList();
  }

  Future<void> updateSwapRequestStatus(String requestId, String status) async {
    await Future.delayed(Duration(milliseconds: 300));
    final index = _mockSwapRequests.indexWhere((req) => req.id == requestId);
    if (index != -1) {
      final request = _mockSwapRequests[index];
      _mockSwapRequests[index] = SwapRequest(
        id: request.id,
        fromUserId: request.fromUserId,
        toUserId: request.toUserId,
        fromUserName: request.fromUserName,
        toUserName: request.toUserName,
        skillOffered: request.skillOffered,
        skillWanted: request.skillWanted,
        status: status,
        createdAt: request.createdAt,
        message: request.message,
      );
    }
  }

  Future<void> updateUserProfile(User user) async {
    await Future.delayed(Duration(milliseconds: 500));
    final index = _mockUsers.indexWhere((u) => u.id == user.id);
    if (index != -1) {
      _mockUsers[index] = user;
    }
    
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_userKey, json.encode(user.toJson()));
  }
}