Linkler ;

#UI -> https://amazing-syrniki-d0c166.netlify.app



#Backend -> https://davincicase.onrender.com/docs



Proje Kurulum Kılavuzu
Bu rehber, projenin hem Backend hem de Frontend bileşenlerini yerel makinenizde nasıl kurup çalıştıracağınıza dair adım adım talimatlar içerir.

📋 Gereksinimler
Projenin sorunsuz bir şekilde çalışması için aşağıdaki yazılımların sisteminizde yüklü olması gerekir:

Node.js: Sürüm 18 veya üzeri.

npm: Sürüm 9 veya üzeri.

Git: Proje dosyalarını klonlamak için gereklidir. (Alternatif olarak cURL veya Postman de kullanılabilir.)

💻 Backend Kurulumu ve Çalıştırılması
Backend, NestJS framework'ü ile geliştirilmiştir ve 4001 numaralı port üzerinden çalışır.

Backend dizinine gidin:

Bash

cd Backend
Bağımlılıkları yükleyin:

Bash

npm i
Geliştirme sunucusunu başlatın:

Bash

npm run start:dev
API ve Swagger Erişimi:
Sunucu çalışmaya başladıktan sonra, API'ye aşağıdaki adresten erişebilirsiniz:

API Ana Sayfası: http://localhost:4001/api

Swagger API Dökümantasyonu: http://localhost:4001/docs

🌐 Frontend Kurulumu ve Çalıştırılması
Frontend, React, Vite ve TypeScript kullanılarak geliştirilmiştir ve 5173 numaralı port üzerinden çalışır.

Frontend dizinine gidin:

Bash

cd frontend
Bağımlılıkları yükleyin:

Bash

npm i
Ortam değişkenini ayarlayın:

frontend dizininde bir .env dosyası oluşturun.

Dosyanın içine aşağıdaki satırı ekleyin:

Kod snippet'i

VITE_API_BASE=http://localhost:4001/api
Uygulamayı çalıştırın:

Bash

npm run dev
Uygulama Erişimi:
Uygulama, geliştirme sunucusu başlatıldıktan sonra aşağıdaki adresten erişilebilir:

Uygulama: http://localhost:5173

🧹 Kod Kalitesi (Linting)
Projenin kod kalitesini kontrol etmek ve otomatik düzeltmeler yapmak için ESLint v9 (Flat Config) kullanılır.

Frontend için:

Bash

npm run lint          # Hataları kontrol eder
Backend için:

Bash

npm run lint          # Hataları kontrol eder
