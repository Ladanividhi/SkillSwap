import 'package:flutter/material.dart';

class RequestSwapScreen extends StatefulWidget {
  final Map<String, dynamic> targetUser;

  const RequestSwapScreen({super.key, required this.targetUser});

  @override
  State<RequestSwapScreen> createState() => _RequestSwapScreenState();
}

class _RequestSwapScreenState extends State<RequestSwapScreen> {
  String? selectedMySkill;
  String? selectedTheirSkill;
  final TextEditingController messageController = TextEditingController();

  // Simulated current user offered skills
  final List<String> mySkills = ["Flutter", "Java", "C++"];

  @override
  Widget build(BuildContext context) {
    final themeColor = Theme.of(context).primaryColor;

    // Safely cast target user's skillsWanted to List<String>
    final List<String> theirSkills = (widget.targetUser['skillsWanted'] as List<dynamic>?)
            ?.map((e) => e.toString())
            .toList() ??
        [];

    return Scaffold(
      appBar: AppBar(
        title: const Text("Swap Request"),
        backgroundColor: themeColor,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // My skill
            const Text(
              "Choose one of your offered skills",
              style: TextStyle(fontWeight: FontWeight.w500),
            ),
            const SizedBox(height: 6),
            DropdownButtonFormField<String>(
              value: selectedMySkill,
              items: mySkills
                  .map((skill) =>
                      DropdownMenuItem(value: skill, child: Text(skill)))
                  .toList(),
              onChanged: (value) {
                setState(() {
                  selectedMySkill = value;
                });
              },
              decoration: InputDecoration(
                border:
                    OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
              ),
            ),

            const SizedBox(height: 20),

            // Their skill
            const Text(
              "Choose one of their wanted skills",
              style: TextStyle(fontWeight: FontWeight.w500),
            ),
            const SizedBox(height: 6),
            DropdownButtonFormField<String>(
              value: selectedTheirSkill,
              items: theirSkills
                  .map((skill) => DropdownMenuItem<String>(
                        value: skill,
                        child: Text(skill),
                      ))
                  .toList(),
              onChanged: (value) {
                setState(() {
                  selectedTheirSkill = value;
                });
              },
              decoration: InputDecoration(
                border:
                    OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
              ),
            ),

            const SizedBox(height: 20),

            // Message box
            const Text(
              "Message",
              style: TextStyle(fontWeight: FontWeight.w500),
            ),
            const SizedBox(height: 6),
            TextFormField(
              controller: messageController,
              maxLines: 4,
              decoration: InputDecoration(
                border:
                    OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
              ),
            ),

            const SizedBox(height: 30),

            // Submit button
            Center(
              child: ElevatedButton(
                onPressed: () {
                  if (selectedMySkill == null || selectedTheirSkill == null) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text("Please select both skills."),
                      ),
                    );
                    return;
                  }

                  // Handle request submission logic here (e.g., backend API or Firebase)
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text("Swap request submitted"),
                    ),
                  );
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: themeColor,
                  padding:
                      const EdgeInsets.symmetric(horizontal: 30, vertical: 14),
                ),
                child: const Text("Submit"),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
