import styles from './announcementBar.module.css';

function AnnouncementBar() {
  return (
    <div className={styles.announcementBar}>
      <div className={styles.scrollText}>
        Free Shipping to Indonesia + Singapore!
      </div>
    </div>
  );
}

export default function ProdukLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnnouncementBar />
      <main>{children}</main>
    </>
  );
}