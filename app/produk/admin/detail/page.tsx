import Image from 'next/image';
import styles from './admindetail.module.css';

export default function AdminDetailPage() {
  return (
    <div className={styles.detailContainer}>
      
      <input type="radio" name="slider-radio" id="slide1" className={styles.sliderRadio} defaultChecked aria-label="Slide 1" />
      <input type="radio" name="slider-radio" id="slide2" className={styles.sliderRadio} aria-label="Slide 2" />
      <input type="radio" name="slider-radio" id="slide3" className={styles.sliderRadio} aria-label="Slide 3" />
      <input type="radio" name="slider-radio" id="slide4" className={styles.sliderRadio} aria-label="Slide 4" />

      <div className={styles.productGallery}>
        <div className={styles.productImages}>
          <Image src="/images/cropped-Gambar2.jpg" alt="Product Image 1" width={500} height={750} />
          <Image src="/images/cropped-Gambar2.jpg" alt="Product Image 2" width={500} height={750} />
          <Image src="/images/cropped-Gambar2.jpg" alt="Product Image 3" width={500} height={750} />
          <Image src="/images/cropped-Gambar2.jpg" alt="Product Image 4" width={500} height={750} />
        </div>

        <div className={styles.imageSliderNav}>
          <label htmlFor="slide1" className={styles.navDot}></label>
          <label htmlFor="slide2" className={styles.navDot}></label>
          <label htmlFor="slide3" className={styles.navDot}></label>
          <label htmlFor="slide4" className={styles.navDot}></label>
        </div>

        <div className={styles.adminUploadSection}>
          <label htmlFor="imageUpload">Tambah Gambar Baru:</label>
          <input type="file" id="imageUpload" name="imageUpload" accept="image/*" multiple />
          <button className={styles.uploadBtn}>Upload</button>
        </div>
      </div>

      <div className={styles.productInfo}>
        <h2 contentEditable suppressContentEditableWarning className={styles.editable}>BAJU A</h2>

        <div className={styles.priceContainer}>
          <div className={styles.priceItem}>
            <h3>Harga Diskon</h3>
            <p className={styles.price}>
              <span>IDR</span>
              <span contentEditable suppressContentEditableWarning className={styles.editable}>450000</span>
            </p>
          </div>
          <div className={styles.priceItem}>
            <h3>Harga Asli</h3>
            <p className={styles.originalPrice}>
              <span>IDR</span>
              <span contentEditable suppressContentEditableWarning className={styles.editable}>699000</span>
            </p>
          </div>
        </div>

        <div className={styles.sizeSelection}>
          <h3>Ukuran & Stok</h3>
          <div className={styles.sizeButtons}>
            {['S', 'M', 'L', 'XL'].map((size, index) => {
              const stocks = ['150', '210', '125', '80'];
              return (
                <div key={size} className={styles.sizeStockItem}>
                  <span className={styles.sizeTag}>{size}</span>
                  <span contentEditable suppressContentEditableWarning className={`${styles.stockCount} ${styles.editable}`}>
                    {stocks[index]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.productDescription}>
          <h3 contentEditable suppressContentEditableWarning className={styles.editable}>Material & Care</h3>
          <p contentEditable suppressContentEditableWarning className={styles.editable}>
            Terbuat dari 100% premium combed cotton yang lembut dan sejuk. Cuci dengan mesin menggunakan air dingin, jangan gunakan pemutih, dan setrika dengan suhu rendah.
          </p>
        </div>

        <button className={styles.addToCart}>Save Changes</button>
      </div>
    </div>
  );
}