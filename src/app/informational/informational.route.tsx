import { Route, Routes } from 'react-router-dom';
import { NotFound } from '../not-found';
import { InfomationalLayout } from './informational.layout';
import { AboutPage } from './about';
import { ContactPage } from './contact';

export function InfomationalRoutes() {
  return (
    <Routes>
      <Route element={<InfomationalLayout />}>
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default InfomationalRoutes;
