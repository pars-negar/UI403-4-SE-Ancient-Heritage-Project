import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import styles from './aboutus.module.css';

const aboutus = () => {
  return (
    <div className={styles.aboutUsPage}>
      <Navbar />
      <main className={styles.aboutUsContent}>
        <section className={styles.aboutUsHero}>
          <h1 style={{fontFamily:"vazirmatn", fontWeight:700}}>درباره پارس‌نگار</h1>
          <p style={{fontFamily:"vazirmatn", fontWeight:500}}>همراه شما در سفری به اعماق تاریخ و فرهنگ ایران زمین</p>
        </section>

        <section className={styles.aboutUsDescription}>
          <h2 style={{fontFamily:"vazirmatn", fontWeight:600}}>ماموریت ما</h2>
          <p style={{fontFamily:"vazirmatn", fontWeight:500}}>
            وب‌سایت گردشگری پارسنگار با افتخار به عنوان پلی میان شما و میراث غنی باستانی ایران، طراحی و راه‌اندازی شده است.
            ماموریت اصلی ما، معرفی و نمایش جامع و دقیق آثار باستانی، مکان‌های تاریخی و جاذبه‌های فرهنگی ایران عزیزمان است.
            ما معتقدیم که با ارائه اطلاعاتی معتبر، تصاویری با کیفیت و تجربیاتی فراموش‌نشدنی، می‌توانیم نقش موثری در ترویج گردشگری فرهنگی و حفظ این گنجینه‌های ارزشمند ایفا کنیم.
          </p>
          <p style={{fontFamily:"vazirmatn", fontWeight:500}}>
            در پارسنگار، شما می‌توانید به اطلاعاتی جامع و دقیق درباره هزاران مکان تاریخی کشور دسترسی پیدا کنید. این اطلاعات شامل توضیحات کامل،
            تصاویر معتبر و باکیفیت، موقعیت جغرافیایی دقیق و همچنین نظرات و نقدهای ارزشمند سایر کاربران است که به شما در برنامه‌ریزی سفری بی‌نظیر کمک می‌کند.
          </p>
        </section>

        <section className={styles.aboutUsFeatures}>
          <h2 style={{fontFamily:"vazirmatn", fontWeight:600}}>خدمات و امکانات ما</h2>
          <div className={styles.featureGrid} style={{fontFamily:"vazirmatn", fontWeight:500}}>
            <div className={styles.featureItem}>
              <h3 style={{fontFamily:"vazirmatn", fontWeight:600}}>تورهای آنلاین و رزرو آسان</h3>
              <p>یکی از امکانات اصلی پلتفرم ما، امکان مشاهده و رزرو آنلاین تورهای مرتبط با مکان‌های تاریخی است.
                پس از انتخاب مقصد دلخواه، می‌توانید لیستی از تورهای موجود را به همراه جزئیات کامل مانند مبدا حرکت،
                زمان‌بندی، مسیر سفر، هزینه و ظرفیت باقیمانده مشاهده نمایید. پرداخت هزینه تور نیز از طریق درگاه بانکی امن و مطمئن انجام می‌شود و پس از تکمیل رزرو، ظرفیت تور به صورت خودکار به‌روزرسانی خواهد شد.</p>
            </div>
            <div className={styles.featureItem}>
              <h3>پلتفرمی برای راهنمایان تور</h3>
              <p>پارسنگار فضایی مناسب برای راهنمایان و برگزارکنندگان تور نیز فراهم آورده است. این افراد پس از ثبت‌نام و ورود به پنل اختصاصی خود،
                می‌توانند برنامه‌های سفر خود را ارائه دهند و مشخصاتی مانند زمان حرکت، مسیر بازدید، هزینه و ظرفیت را تعیین کنند.
                با هر رزرو جدید، اطلاعات مالی و ظرفیت باقیمانده برای آنها به صورت لحظه‌ای قابل مشاهده خواهد بود.</p>
            </div>
            <div className={styles.featureItem}>
              <h3>جامعه‌ای پویا و تعاملی</h3>
              <p>ما به ایجاد فضایی تعاملی برای کاربرانمان اهمیت می‌دهیم. شما می‌توانید تجربیات خود را به اشتراک بگذارید،
                نظرات و نقدهای سازنده بنویسید و از تجربیات دیگران برای برنامه‌ریزی سفرهای آینده خود بهره‌مند شوید.
                هدف ما ایجاد یک جامعه قدرتمند از علاقه‌مندان به تاریخ و فرهنگ ایران است.</p>
            </div>
          </div>
        </section>

        <section className={styles.aboutUsVision}>
          <h2 style={{fontFamily:"vazirmatn", fontWeight:600}}>چشم‌انداز ما</h2>
          <p style={{fontFamily:"vazirmatn", fontWeight:500}}>
            چشم‌انداز ما در پارسنگار، تبدیل شدن به مرجعی کامل و بی‌بدیل برای گردشگری فرهنگی ایران است.
            ما در تلاشیم تا با بهره‌گیری از جدیدترین تکنولوژی‌ها و ارائه بهترین خدمات، تجربه‌ای متفاوت و به‌یادماندنی از سفرهای داخلی را برای شما فراهم آوریم.
            با پارسنگار، هر سفر، یک داستان جدید است.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default aboutus;