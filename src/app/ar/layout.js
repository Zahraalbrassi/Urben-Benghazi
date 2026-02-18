export const metadata = {
  title: 'أوربن بنغازي',
  description: 'مبادرة التنمية الحضرية لمدينة بنغازي',
};

export default function RootLayout({ children }) {
  return (
    <div dir="rtl" lang="ar">
      {children}
    </div>
  );
}
