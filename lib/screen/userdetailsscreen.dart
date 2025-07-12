import 'package:flutter/material.dart';
import 'package:skillswap/screen/requestswapscreen.dart';

class UserDetails extends StatelessWidget {
  final Map<String, dynamic> user;

  const UserDetails({super.key, required this.user});

  @override
  Widget build(BuildContext context) {
    final themeColor = Theme.of(context).primaryColor;

    // Mock feedbacks
    final List<String> feedbacks = [
      "Great at explaining concepts!",
      "Quick and responsive.",
      "Very helpful and knowledgeable.",
    ];

    return Scaffold(
      appBar: AppBar(
        backgroundColor: themeColor,
        title: const Text("User Details"),
        actions: [
          TextButton(
            onPressed: () {},
            child: const Text("Swap Request", style: TextStyle(color: Colors.white)),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(context);
            },
            child: const Text("Home", style: TextStyle(color: Colors.white)),
          ),
          const Padding(
            padding: EdgeInsets.symmetric(horizontal: 8.0),
            child: CircleAvatar(child: Icon(Icons.person)),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Profile
            Center(
              child: Column(
                children: [
                  const CircleAvatar(
                    radius: 50,
                    child: Text("Profile\nPhoto", textAlign: TextAlign.center, style: TextStyle(fontSize: 10)),
                  ),
                  const SizedBox(height: 12),
                  Text(user['name'], style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 8),
                  Text("⭐ ${user['rating']}/5", style: const TextStyle(fontSize: 16)),
                ],
              ),
            ),
            const SizedBox(height: 30),

            // Skills Offered
            const Text("Skills Offered", style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600)),
            const SizedBox(height: 10),
            Wrap(
              spacing: 10,
              children: user["skillsOffered"]
                  .map<Widget>((skill) => Chip(
                        label: Text(skill),
                        backgroundColor: Colors.lightGreen.shade50,
                      ))
                  .toList(),
            ),

            const SizedBox(height: 24),

            // Skills Wanted
            const Text("Skills Wanted", style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600)),
            const SizedBox(height: 10),
            Wrap(
              spacing: 10,
              children: user["skillsWanted"]
                  .map<Widget>((skill) => Chip(
                        label: Text(skill),
                        backgroundColor: Colors.orange.shade50,
                      ))
                  .toList(),
            ),

            const SizedBox(height: 30),

            // Feedback Section
            const Text("Feedbacks", style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600)),
            const SizedBox(height: 10),
            ...feedbacks.map((f) => ListTile(
                  leading: const Icon(Icons.comment, size: 20),
                  title: Text(f, style: const TextStyle(fontSize: 14)),
                  contentPadding: EdgeInsets.zero,
                )),

            const SizedBox(height: 30),

            // Navigate to Swap Request screen
            Center(
              child: ElevatedButton.icon(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => RequestSwapScreen(
                        targetUser: user,
                      ),
                    ),
                  );
                },
                icon: const Icon(Icons.swap_horiz),
                label: const Text("Send Swap Request"),
                style: ElevatedButton.styleFrom(
                  backgroundColor: themeColor,
                  padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
