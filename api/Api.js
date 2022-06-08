import axios from 'axios';
import {Platform } from 'react-native';

export const API_URL = Platform.OS === 'ios' ?'http://192.168.1.113:8000/': 'http://localhost:8000';

const URL = Platform.OS === 'ios'|| "android" ?'http://192.168.1.113:8000/': 'http://localhost:8000';
export default axios.create({ baseURL: URL });