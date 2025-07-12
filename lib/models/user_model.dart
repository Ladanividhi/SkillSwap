class User {
  final String id;
  final String name;
  final String email;
  final String? location;
  final String? profilePhoto;
  final List<String> skillsOffered;
  final List<String> skillsWanted;
  final String availability;
  final bool isPublic;
  final double rating;
  final int totalSwaps;

  User({
    required this.id,
    required this.name,
    required this.email,
    this.location,
    this.profilePhoto,
    required this.skillsOffered,
    required this.skillsWanted,
    required this.availability,
    required this.isPublic,
    this.rating = 0.0,
    this.totalSwaps = 0,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      name: json['name'],
      email: json['email'],
      location: json['location'],
      profilePhoto: json['profilePhoto'],
      skillsOffered: List<String>.from(json['skillsOffered'] ?? []),
      skillsWanted: List<String>.from(json['skillsWanted'] ?? []),
      availability: json['availability'] ?? 'Weekends',
      isPublic: json['isPublic'] ?? true,
      rating: (json['rating'] ?? 0.0).toDouble(),
      totalSwaps: json['totalSwaps'] ?? 0,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'email': email,
      'location': location,
      'profilePhoto': profilePhoto,
      'skillsOffered': skillsOffered,
      'skillsWanted': skillsWanted,
      'availability': availability,
      'isPublic': isPublic,
      'rating': rating,
      'totalSwaps': totalSwaps,
    };
  }
}

class SwapRequest {
  final String id;
  final String fromUserId;
  final String toUserId;
  final String fromUserName;
  final String toUserName;
  final String skillOffered;
  final String skillWanted;
  final String status; // pending, accepted, rejected, completed
  final DateTime createdAt;
  final String? message;

  SwapRequest({
    required this.id,
    required this.fromUserId,
    required this.toUserId,
    required this.fromUserName,
    required this.toUserName,
    required this.skillOffered,
    required this.skillWanted,
    required this.status,
    required this.createdAt,
    this.message,
  });

  factory SwapRequest.fromJson(Map<String, dynamic> json) {
    return SwapRequest(
      id: json['id'],
      fromUserId: json['fromUserId'],
      toUserId: json['toUserId'],
      fromUserName: json['fromUserName'],
      toUserName: json['toUserName'],
      skillOffered: json['skillOffered'],
      skillWanted: json['skillWanted'],
      status: json['status'],
      createdAt: DateTime.parse(json['createdAt']),
      message: json['message'],
    );
  }
}