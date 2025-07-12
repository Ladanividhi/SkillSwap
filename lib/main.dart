import 'package:flutter/material.dart';
import 'package:skillswap/screen/loginscreen.dart';
void main() {
  runApp(SkillSwapApp());
}

class SkillSwapApp extends StatelessWidget {
  const SkillSwapApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Skill Swap Platform',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primaryColor: Color(0xFF1878F3),
        scaffoldBackgroundColor: Colors.white,
        appBarTheme: AppBarTheme(
          backgroundColor: Color(0xFF1878F3),
          elevation: 0,
          iconTheme: IconThemeData(color: Colors.white),
          titleTextStyle: TextStyle(
            color: Colors.white,
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            foregroundColor: Colors.white,
            backgroundColor: Color(0xFF1878F3),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
            ),
            padding: EdgeInsets.symmetric(vertical: 12, horizontal: 24),
          ),
        ),
        inputDecorationTheme: InputDecorationTheme(
          filled: true,
          fillColor: Colors.grey.shade100,
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: BorderSide.none,
          ),
          contentPadding: EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        ),
        cardTheme: const CardThemeData(
          elevation: 4,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.all(Radius.circular(16)),
          ),
          margin: EdgeInsets.symmetric(vertical: 10, horizontal: 16),
        ),

        textTheme: TextTheme(
          bodyMedium: TextStyle(fontSize: 16),
          titleLarge: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
      home: LoginScreen(), // Default page
    );
  }
}
