'use client'

import Link from "next/link";
import styles from './page.module.css';
import { useWithBasePath } from '@/hooks/useBasePath';

export default function Home() {
  const withBasePath = useWithBasePath()

  const phoneContacts = [
    {
      label: "Доставка",
      number: "+1 (800) 555-3333",
    },
    {
      label: "Технический отдел",
      number: "+1 (800) 555-4444",
    },
    {
      label: "Отдел продаж",
      number: "+1 (800) 555-1234",
    }
  ]

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Добро пожаловать в интернет-магазин
          </h1>
          <p className={styles.description}>
            Открывайте для себя удивительные товары и выбирайте то, что вам нравится. Просмотрите нашу коллекцию или добавьте новые товары в каталог.
          </p>
        </div>
        <div className={styles.actions}>
          <Link
            href={withBasePath("/products")}
            className={styles.primaryButton}
          >
            Просмотр товаров
          </Link>
          <Link
            href={withBasePath("/create-product")}
            className={styles.secondaryButton}
          >
            Создать товар
          </Link>
        </div>

        <footer className={styles.footer}>
          <div className={styles.contactsSection}>
            <h3 className={styles.contactsTitle}>Наши контакты</h3>
            <div className={styles.contactsGrid}>
              {phoneContacts.map((contact, index) => (
                <div key={index} className={styles.contactHeader}>
                  <span className={styles.contactLabel}>{contact.label}</span>
                  <a
                    href={`tel:${contact.number.replace(/\D/g, '')}`}
                    className={styles.contactNumber}
                  >
                    {contact.number}
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p className={styles.footerText}>
              Наш интернет-магазин работает с 2020 года.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}