import 'package:flutter/material.dart';
import 'package:skillswap/screen/loginscreen.dart';
import 'package:skillswap/screen/userdetailsscreen.dart';

class Homescreen extends StatelessWidget {
  final List<Map<String, dynamic>> users = [
    {
      "name": "Marc Demo",
      "rating": "3.9",
      "skillsOffered": ["JavaScript", "Python"],
      "skillsWanted": ["Photoshop", "Graphic Designer"]
    },
    {
      "name": "Michell",
      "rating": "2.5",
      "skillsOffered": ["Java", "React"],
      "skillsWanted": ["Photoshop", "Graphic Designer"]
    },
    {
      "name": "Joe Vills",
      "rating": "4.0",
      "skillsOffered": ["SQL", "Flutter"],
      "skillsWanted": ["Photoshop", "Graphic Designer"]
    },
  ];

  Homescreen({super.key});

  @override
  Widget build(BuildContext context) {
    final themeColor = Theme.of(context).primaryColor;

    return Scaffold(
      appBar: AppBar(
        backgroundColor: themeColor,
        title: const Text("Skill Swap Platform"),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => LoginScreen()),
              );
            },
            child: const Text("Login", style: TextStyle(color: Colors.white)),
          ),
        ],
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            children: [
              // Search + Dropdown
              Row(
                children: [
                  Expanded(
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12),
                      decoration: BoxDecoration(
                        border: Border.all(color: Colors.grey.shade300),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: DropdownButtonHideUnderline(
                        child: DropdownButton<String>(
                          value: "Availability",
                          items: const [
                            DropdownMenuItem(
                                value: "Availability",
                                child: Text("Availability")),
                            DropdownMenuItem(
                                value: "Morning", child: Text("Morning")),
                            DropdownMenuItem(
                                value: "Evening", child: Text("Evening")),
                            DropdownMenuItem(
                                value: "Weekends", child: Text("Weekends")),
                          ],
                          onChanged: (value) {},
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: TextField(
                      decoration: InputDecoration(
                        hintText: "Search...",
                        suffixIcon: Icon(Icons.search),
                        contentPadding:
                            const EdgeInsets.symmetric(horizontal: 12),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(8),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 20),

              // User Cards
              ListView.builder(
                physics: const NeverScrollableScrollPhysics(),
                shrinkWrap: true,
                itemCount: users.length,
                itemBuilder: (context, index) {
                  final user = users[index];
                  return GestureDetector(
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => UserDetails(user: user),
                        ),
                      );
                    },
                    child: Card(
                      color: Colors.white,
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(16)),
                      margin: const EdgeInsets.symmetric(vertical: 10),
                      elevation: 2,
                      child: Padding(
                        padding: const EdgeInsets.all(16),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            // Header Row
                            Row(
                              children: [
                                const CircleAvatar(
                                  radius: 30,
                                  child: Text("Photo",
                                      style: TextStyle(fontSize: 10)),
                                ),
                                const SizedBox(width: 16),
                                Expanded(
                                  child: Text(
                                    user["name"],
                                    style: const TextStyle(
                                        fontSize: 18,
                                        fontWeight: FontWeight.bold),
                                  ),
                                ),
                                Column(
                                  children: [
                                    ElevatedButton(
                                      onPressed: () {},
                                      style: ElevatedButton.styleFrom(
                                        backgroundColor: themeColor,
                                        padding: const EdgeInsets.symmetric(
                                            horizontal: 16, vertical: 10),
                                        shape: RoundedRectangleBorder(
                                          borderRadius:
                                              BorderRadius.circular(8),
                                        ),
                                      ),
                                      child: const Text("Request"),
                                    ),
                                    const SizedBox(height: 8),
                                    Text("⭐ ${user["rating"]}/5",
                                        style:
                                            const TextStyle(fontSize: 12)),
                                  ],
                                ),
                              ],
                            ),
                            const SizedBox(height: 12),

                            // Skills Offered
                            Align(
                              alignment: Alignment.centerLeft,
                              child: Text("Skills Offered =>",
                                  style: TextStyle(
                                      color: themeColor,
                                      fontWeight: FontWeight.w500,
                                      fontSize: 13)),
                            ),
                            const SizedBox(height: 6),
                            Wrap(
                              spacing: 6,
                              runSpacing: -8,
                              children: user["skillsOffered"]
                                  .map<Widget>((skill) => Chip(
                                        label: Text(
                                          skill,
                                          style:
                                              const TextStyle(fontSize: 12),
                                        ),
                                        backgroundColor:
                                            Colors.grey.shade200,
                                        padding:
                                            const EdgeInsets.symmetric(
                                                horizontal: 8),
                                        visualDensity:
                                            VisualDensity.compact,
                                      ))
                                  .toList(),
                            ),
                            const SizedBox(height: 8),

                            // Skills Wanted
                            Align(
                              alignment: Alignment.centerLeft,
                              child: Text("Skills Wanted =>",
                                  style: TextStyle(
                                      color: themeColor,
                                      fontWeight: FontWeight.w500,
                                      fontSize: 13)),
                            ),
                            const SizedBox(height: 6),
                            Wrap(
                              spacing: 6,
                              runSpacing: -8,
                              children: user["skillsWanted"]
                                  .map<Widget>((skill) => Chip(
                                        label: Text(
                                          skill,
                                          style:
                                              const TextStyle(fontSize: 12),
                                        ),
                                        backgroundColor:
                                            Colors.grey.shade200,
                                        padding:
                                            const EdgeInsets.symmetric(
                                                horizontal: 8),
                                        visualDensity:
                                            VisualDensity.compact,
                                      ))
                                  .toList(),
                            ),
                          ],
                        ),
                      ),
                    ),
                  );
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
