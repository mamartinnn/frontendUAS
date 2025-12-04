import { prisma } from '@/lib/prisma';
import { updateProduct } from '@/app/actions/product';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import styles from './edit.module.css';

interface Props {
    params: Promise<{ id: string }>;
}

export default async function EditProductPage(props: Props) {
  const params = await props.params;
  
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: { productImages: true }
  });

  if (!product) notFound();

  return (
    <div className={styles.editContainer}>
      <h1 className={styles.title}>Edit Product</h1>
      
      <form action={updateProduct} className={styles.form}>
        <input type="hidden" name="id" value={product.id} />
        
        <div className={styles.formGroup}>
            <span className={styles.label}>Current Images</span>
            <div className={styles.imageGrid}>
                {product.productImages.map((img) => (
                    <div key={img.id} className={styles.imagePreview}>
                        <Image src={img.url} alt="Product" fill style={{ objectFit: 'cover' }} />
                    </div>
                ))}
            </div>
        </div>

        <div className={styles.formGroup}>
            <label htmlFor="imageUpload" className={styles.subLabel}>
                Replace Images (Optional)
            </label>
            <input 
                id="imageUpload"
                type="file" 
                name="imageUpload" 
                multiple 
                accept="image/*"
                className={styles.fileInput}
            />
        </div>

        <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.subLabel}>Product Name</label>
            <input 
                id="name"
                name="name" 
                defaultValue={product.name}
                required 
                className={styles.input}
                placeholder="Product Name"
            />
        </div>

        <div className={styles.row}>
            <div className={styles.col}>
                <label htmlFor="price" className={styles.subLabel}>Sale Price</label>
                <input 
                    id="price"
                    name="price" 
                    type="number" 
                    defaultValue={product.price}
                    required 
                    className={styles.input}
                    placeholder="0"
                />
            </div>
            <div className={styles.col}>
                <label htmlFor="origPrice" className={styles.subLabel}>Original Price</label>
                <input 
                    id="origPrice"
                    name="origPrice" 
                    type="number" 
                    defaultValue={product.origPrice}
                    required 
                    className={styles.input}
                    placeholder="0"
                />
            </div>
        </div>

        <div className={styles.formGroup}>
            <label htmlFor="description" className={styles.subLabel}>Description</label>
            <textarea 
                id="description"
                name="description" 
                defaultValue={product.description}
                required 
                rows={6}
                className={styles.textarea}
                placeholder="Product Description"
            />
        </div>

        <div className={styles.buttonGroup}>
            <button type="submit" className={styles.saveButton}>
                Save Changes
            </button>
            <Link href="/produk/admin" className={styles.cancelButton}>
                Cancel
            </Link>
        </div>
      </form>
    </div>
  );
}