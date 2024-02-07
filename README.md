# FE_FCodeTest

## Project template shop bán hàng

### Local run

Clone về và vào thư mục dự án, sau đó mở terminal và chạy các lệnh sau:

- Cài đặt thư viện, dependencies :

```bash
    npm install
```

 hoặc :

```bash
    npm i
```

- hoặc với *yarn* :

```bash
    yarn install
```

- Chạy project :  
- Dev :

```bash
    npm run dev
```

- Production:

```bash
    npm run build

    npm run start --port 3001
```

- Mở trình duyện và truy cập vào địa chỉ: <http://localhost:3001>



### Server deploy

- Clone về ```/space/personals/<username>/``` và vào thư mục dự án, sau đó chạy các lệnh sau :  
- Vào screen :

```bash
    screen -S <tên screen>

    Nếu đã có screen :

    screen -dR <tên screen>
```

- Build image :

```bash
    docker compose build
```

- Chạy image :

```bash
    docker compose up
```

Mở trình duyện và truy cập vào địa chỉ: <http://localhost:3001>
