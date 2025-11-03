import Image from "next/image";
import Link from "next/link";
import styles from './page.module.css';

export default function Home() {

  const phoneContacts = [
    {
      label: "Customer Service",
      number: "+1 (800) 555-1234",
      hours: "Mon-Fri 9AM-6PM EST"
    },
    {
      label: "Technical Support",
      number: "+1 (800) 555-5678",
      hours: "24/7"
    },
    {
      label: "Sales Department",
      number: "+1 (800) 555-9012",
      hours: "Mon-Sat 8AM-8PM EST"
    }
  ]
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className={styles.content}>
          <h1 className={styles.title}>
            Добро пожаловать в интернет-магазин
          </h1>
          <p className={styles.description}>
            Открывайте для себя удивительные товары и выбирайте то, что вам нравится больше всего. Просмотрите нашу коллекцию или добавьте новые товары в каталог.
          </p>
        </div>
        <div className={styles.actions}>
          <Link
            href="/products"
            className={styles.primaryButton}
          >
            <Image
              className={styles.buttonLogo}
              src="/next.svg"
              alt="Products"
              width={16}
              height={16}
            />
            Просмотр продуктов
          </Link>
          <Link
            href="/create-product"
            className={styles.secondaryButton}
          >
            Создать продукт
          </Link>
        </div>

        <footer className={styles.footer}>
          <div className={styles.contactsSection}>
            <h3 className={styles.contactsTitle}>Contact Information</h3>
            <div className={styles.contactsGrid}>
              {phoneContacts.map((contact, index) => (
                <div key={index} className={styles.contactItem}>
                  <div className={styles.contactHeader}>
                    <span className={styles.contactLabel}>{contact.label}</span>
                    <a
                      href={`tel:${contact.number.replace(/\D/g, '')}`}
                      className={styles.contactNumber}
                    >
                      {contact.number}
                    </a>
                  </div>
                  <span className={styles.contactHours}>{contact.hours}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p className={styles.footerText}>
              Наш интернет магазин работает с 2020 года.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}