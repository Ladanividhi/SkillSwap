import 'package:flutter/material.dart';

import 'package:skill_swap_platform/screen/splash_screen.dart';
import 'package:skill_swap_platform/screen/login_screen.dart';
import 'package:skill_swap_platform/screen/register_screen.dart';
import 'package:skill_swap_platform/screen/home_screen.dart';
import 'package:skill_swap_platform/screen/profile_screen.dart';
import 'package:skill_swap_platform/screen/create_profile_screen.dart';
import 'package:skill_swap_platform/screen/swap_requests_screen.dart';
import 'package:skill_swap_platform/screen/user_detail_screen.dart';
import 'models/user_model.dart';
import 'package:skill_swap_platform/services/auth_services.dart';

void main() {
  runApp(SkillSwapApp());
}

class SkillSwapApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Skill Swap Platform',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        brightness: Brightness.light,
        scaffoldBackgroundColor: Colors.grey[50],
        appBarTheme: AppBarTheme(
          backgroundColor: Colors.white,
          foregroundColor: Colors.black87,
          elevation: 1,
        ),
      ),
      initialRoute: '/',
      routes: {
        '/': (context) => SplashScreen(),
        '/login': (context) => LoginScreen(),
        '/register': (context) => RegisterScreen(),
        '/home': (context) => HomeScreen(),
        '/profile': (context) => ProfileScreen(),
        '/create-profile': (context) => CreateProfileScreen(),
        '/swap-requests': (context) => SwapRequestsScreen(),
      },
    );
  }
}