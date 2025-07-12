import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:multi_select_flutter/multi_select_flutter.dart';
import 'package:skillswap/screen/homescreen.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  final TextEditingController nameController = TextEditingController();
  final TextEditingController locationController = TextEditingController();

  final List<String> allSkills = [
    'Graphic Design',
    'Video Editing',
    'Photoshop',
    'Python',
    'JavaScript',
    'Manager',
    'SQL',
    'Flutter',
  ];

  List<String> selectedSkillsOffered = [];
  List<String> selectedSkillsWanted = [];

  String availability = "Morning";
  bool isPublicProfile = true;

  File? profileImage;

  Future<void> pickImage() async {
    final picked = await ImagePicker().pickImage(source: ImageSource.gallery);
    if (picked != null) {
      setState(() {
        profileImage = File(picked.path);
      });
    }
  }

  void removeImage() {
    setState(() {
      profileImage = null;
    });
  }

  @override
  Widget build(BuildContext context) {
    final themeColor = Theme.of(context).primaryColor;

    return Scaffold(
      appBar: AppBar(
        backgroundColor: themeColor,
        title: const Text("User Profile"),
        actions: [
          TextButton(
            onPressed: () {
              // Navigate to Swap Request screen (if needed later)
            },
            child: const Text(
              "Swap Request",
              style: TextStyle(color: Colors.white),
            ),
          ),
          TextButton(
            onPressed: () {
              // Navigate to HomeScreen
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(builder: (context) => Homescreen()),
              );
            },
            child: const Text("Home", style: TextStyle(color: Colors.white)),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Profile Photo Centered
            Center(
              child: Column(
                children: [
                  CircleAvatar(
                    radius: 50,
                    backgroundColor: Colors.grey.shade200,
                    backgroundImage:
                        profileImage != null ? FileImage(profileImage!) : null,
                    child:
                        profileImage == null
                            ? const Text(
                              "Profile\nPhoto",
                              textAlign: TextAlign.center,
                              style: TextStyle(fontSize: 10),
                            )
                            : null,
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      TextButton(
                        onPressed: pickImage,
                        child: const Text("Add/Edit"),
                      ),
                      TextButton(
                        onPressed: removeImage,
                        child: const Text(
                          "Remove",
                          style: TextStyle(color: Colors.red),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),

            const SizedBox(height: 16),
            TextField(
              controller: nameController,
              decoration: const InputDecoration(labelText: "Name"),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: locationController,
              decoration: const InputDecoration(labelText: "Location"),
            ),

            const SizedBox(height: 16),
            const Text(
              "Skills Offered",
              style: TextStyle(fontWeight: FontWeight.w500),
            ),
            MultiSelectDialogField<String>(
              items: allSkills.map((e) => MultiSelectItem(e, e)).toList(),
              title: const Text("Select Skills Offered"),
              initialValue: selectedSkillsOffered,
              onConfirm: (values) {
                setState(() => selectedSkillsOffered = values);
              },
              listType: MultiSelectListType.CHIP,
              chipDisplay: MultiSelectChipDisplay(
                onTap: (value) {
                  setState(() => selectedSkillsOffered.remove(value));
                },
              ),
            ),

            const SizedBox(height: 16),
            const Text(
              "Skills Wanted",
              style: TextStyle(fontWeight: FontWeight.w500),
            ),
            MultiSelectDialogField<String>(
              items: allSkills.map((e) => MultiSelectItem(e, e)).toList(),
              title: const Text("Select Skills Wanted"),
              initialValue: selectedSkillsWanted,
              onConfirm: (values) {
                setState(() => selectedSkillsWanted = values);
              },
              listType: MultiSelectListType.CHIP,
              chipDisplay: MultiSelectChipDisplay(
                onTap: (value) {
                  setState(() => selectedSkillsWanted.remove(value));
                },
              ),
            ),

            const SizedBox(height: 16),
            const Text(
              "Availability",
              style: TextStyle(fontWeight: FontWeight.w500),
            ),
            const SizedBox(height: 8),
            DropdownButtonFormField<String>(
              value: availability,
              items: const [
                DropdownMenuItem(value: "Morning", child: Text("Morning")),
                DropdownMenuItem(value: "Evening", child: Text("Evening")),
                DropdownMenuItem(value: "Weekends", child: Text("Weekends")),
              ],
              onChanged: (value) {
                if (value != null) setState(() => availability = value);
              },
              decoration: const InputDecoration(border: OutlineInputBorder()),
            ),

            const SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  "Public Profile",
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.w500),
                ),
                Switch(
                  value: isPublicProfile,
                  onChanged: (val) {
                    setState(() => isPublicProfile = val);
                  },
                  activeColor: themeColor,
                ),
              ],
            ),

            const SizedBox(height: 30),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 10),
              child: Row(
                children: [
                  Expanded(
                    child: ElevatedButton(
                      onPressed: () {
                        // Save logic
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.green,
                        padding: const EdgeInsets.symmetric(vertical: 14),
                      ),
                      child: const Text("Save"),
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: ElevatedButton(
                      onPressed: () {
                        // Discard logic
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.red,
                        padding: const EdgeInsets.symmetric(vertical: 14),
                      ),
                      child: const Text("Discard"),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
