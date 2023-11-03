import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthRoute from './components/AuthRoute';
import Home from './pages/Home';
import ExamList from './pages/Admin/Exam/ExamList';
import SetExam from './pages/Admin/Exam/SetExam';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<AuthRoute />}>
          <Route path="/" element={<Home />} />
          {/* Admin */}
          <Route path="/admin/exam" element={<ExamList />} />
          {['add', 'edit/:id'].map((path, index) => (
            <Route
              path={`/admin/exam/${path}`}
              element={<SetExam />}
              key={index}
            />
          ))}
          <Route path="/admin/exam/add" element={<SetExam />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
