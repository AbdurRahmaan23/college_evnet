import 'dart:convert';
import 'package:http/http.dart' as http;
import 'event.dart';

class EventService {
  static Future<List<Event>> fetchEvents() async {
    final response = await http.get(Uri.parse('http://localhost:3000/events'));

    if (response.statusCode == 200) {
      List jsonResponse = json.decode(response.body);
      return jsonResponse.map((event) => Event.fromJson(event)).toList();
    } else {
      throw Exception('Failed to load events');
    }
  }
}