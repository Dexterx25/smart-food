import { showMessage } from 'react-native-flash-message';

export function errorMessageAlert(title, description) {
  showMessage({
    message: title,
    description,
    type: 'default',
    backgroundColor: '#FFF9F9',
    color: '#E9646F',
    floating: true,
  });
}

export function successMessage(title, description) {
  showMessage({
    message: title,
    description,
    type: 'default',
    backgroundColor: '#EDFBF9',
    color: '#19BA9C',
    floating: true,
    duration: 2500

  });
}

export function successMessageEvent(title, description) {
  showMessage({
    message: title,
    description,
    type: 'default',
    backgroundColor: '#EDFBF9',
    color: '#19BA9C',
    floating: true,
    duration: 4000

  });
}
export function successMessageNotification (title, description){
  showMessage({
    message: title,
    description,
    type: 'default',
    backgroundColor: '#EDFBF9',
    color: '#19BA9C',
    floating: true,
    duration: 4000

  });
}
export function successMessageCode(title, description) {
  showMessage({
    message: title,
    description,
    type: 'default',
    backgroundColor: '#EDFBF9',
    color: '#19BA9C',
    floating: true,
    duration: 8000,

  });
};
export function alertMessage(title, description) {
  showMessage({
    message: title,
    description,
    type: 'default',
    backgroundColor: '#FDF9F1',
    color: '#F5A623',
    floating: true
  });
}
