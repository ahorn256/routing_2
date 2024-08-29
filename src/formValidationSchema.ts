import * as Yup from 'yup';

const formValidationSchema = Yup.object().shape({
  title: Yup.string().required('Titel ist ein Pflichtfeld.'),
  author: Yup.string().required('Author ist ein Pflichtfeld.'),
  isbn: Yup.string().required('ISBN ist ein Pflichtfeld.'),
});

export default formValidationSchema;
