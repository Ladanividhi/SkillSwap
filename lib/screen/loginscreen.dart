import 'package:flutter/material.dart';
import 'package:skillswap/screen/profilescreen.dart';

class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      resizeToAvoidBottomInset: true,
      body: SingleChildScrollView(
        child: Column(
          children: [
            // Top Gradient Container
            Container(
              width: double.infinity,
              height: 240,
              
              decoration: BoxDecoration(
                color: Theme.of(context).primaryColor,
                borderRadius: BorderRadius.only(
                  bottomLeft: Radius.circular(40),
                  bottomRight: Radius.circular(40),
                ),
              ),
              child: const Padding(
                
                padding: EdgeInsets.only(top: 80.0, left: 24.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      "Login",
                      style: TextStyle(
                        fontSize: 30,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                    SizedBox(height: 8),
                    Text(
                      "Enter a beautiful world",
                      style: TextStyle(
                        fontSize: 16,
                        color: Colors.white70,
                      ),
                    ),
                  ],
                ),
              ),
            ),

            // Login Form
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 32.0, vertical: 32),
              child: Column(
                children: [
                  // Email
                  Container(
                    decoration: BoxDecoration(
                      color: Colors.grey.shade200,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: const TextField(
                      decoration: InputDecoration(
                        border: InputBorder.none,
                        hintText: "Your Email",
                        prefixIcon: Icon(Icons.email_outlined, color: Colors.grey),
                        contentPadding: EdgeInsets.symmetric(vertical: 18),
                      ),
                    ),
                  ),
                  const SizedBox(height: 20),

                  // Password
                  Container(
                    decoration: BoxDecoration(
                      color: Colors.grey.shade200,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: const TextField(
                      obscureText: true,
                      decoration: InputDecoration(
                        border: InputBorder.none,
                        hintText: "Password",
                        prefixIcon: Icon(Icons.lock_outline, color: Colors.grey),
                        contentPadding: EdgeInsets.symmetric(vertical: 18),
                      ),
                    ),
                  ),

                  // Forgot Password
                  Align(
                    alignment: Alignment.centerRight,
                    child: TextButton(
                      onPressed: () {},
                      child: const Text(
                        "forget password",
                        style: TextStyle(color: Colors.grey, fontSize: 13),
                      ),
                    ),
                  ),

                  const SizedBox(height: 10),

                  // Login Button
                  SizedBox(
                    width: double.infinity,
                    height: 48,
                    child: ElevatedButton(
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(builder: (context) => ProfileScreen()),
                        );
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Theme.of(context).primaryColor,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(8),
                        ),
                        elevation: 0,
                      ),
                      child: const Text(
                        "LOGIN",
                        style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                      ),
                    ),
                  ),

                  const SizedBox(height: 30),

                  // Register Row
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      GestureDetector(
                        onTap: () {
                          // Navigate to register
                        },
                        child: Text(
                          "Forgot Username / Password",
                          style: TextStyle(
                            color: Theme.of(context).primaryColor,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}
