import Header from "./components/header";

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="announcement-bar">
        <p>Free Shipping to Indonesia + Singapore!</p>
      </div>
      <main>{children}</main>
    </>
  );
}