import { redirect } from 'next/navigation';

export default function AdminRootPage() {
    // Kullanıcı /admin yazdığında doğrudan /admin/login sayfasına gider
    redirect('/admin/login');
}