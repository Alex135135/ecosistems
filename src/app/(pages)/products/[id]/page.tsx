import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Edit } from 'lucide-react';
import styles from './productDetailPage.module.css';
import { productsApi } from '@/services/api/fakeStoreApi';

export async function generateStaticParams() {
    try {
        const products = await productsApi.getProducts();
        return products.map((product) => ({ id: String(product.id) }));
    } catch (error) {
        console.error('Error generating static params:', error);

        return [{ id: 'fallback' }];
    }
}

export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    if (!id || id === 'fallback') {
        notFound();
    }

    let product;
    try {
        product = await productsApi.getProductById(id);
        if (!product) {
            notFound();
        }
    } catch (error) {
        console.error(`Error fetching product with id ${id}:`, error);
        notFound();
    }

    const dateAdded = new Date(product.createdAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Link href="/products" className={styles.backLink}>
                    ← Вернуться к товарам
                </Link>

                {/* <button type="button" className={styles.editButton} title="Редактировать">
          <Edit size={18} />
        </button> */}
            </header>

            <main className={styles.grid}>
                <div className={styles.imageWrapper}>
                    <img
                        src={product.image}
                        alt={`${product.title} — изображение товара`}
                        className={styles.image}
                        loading="lazy"
                        decoding="async"
                    />
                </div>

                <div className={styles.content}>
                    <h1 className={styles.title}>{product.title}</h1>
                    <p className={styles.price}>${product.price.toFixed(2)}</p>

                    <span className={styles.category} title={product.category}>
                        {product.category}
                    </span>

                    <p className={styles.description}>{product.description}</p>

                    <div className={styles.details}>
                        <div className={styles.rating}>
                            <span className={styles.star}>★ {product.rating.rate.toFixed(1)}</span>
                            <span className={styles.reviews}>({product.rating.count} reviews)</span>
                        </div>
                        <div className={styles.date}>Added: {dateAdded}</div>
                    </div>
                </div>
            </main>
        </div>
    );
}