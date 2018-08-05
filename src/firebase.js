import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

import firebaseConfig from '@/const/firebaseConfig';

firebase.initializeApp(firebaseConfig);

export default firebase;
