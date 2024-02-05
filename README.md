# Deligent Logistics Frontend

## Project logistics quản lý đơn hàng và lô hàng cho nhà cung ứng

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

- Kết nối service backend :  
- Auth service:

```bash
    ssh -L <port>:localhost:<port> <username>@<ip_server>

    Ví dụ hiện tại:

    ssh -L 35000:localhost:35000 trilm@35.240.193.89
```

- Logistics service :

```bash
    ssh -L <port>:localhost:<port> <username>@<ip_server>

    Ví dụ hiện tại:

    ssh -L 35002:localhost:35002 trilm@35.240.193.89
```

- Mở trình duyện và truy cập vào địa chỉ: <http://localhost:3001>

### Remote run

- Kết nối service frontend :

```bash
    ssh -L <port>:localhost:<port> <username>@<ip_server>

    Ví dụ hiện tại:

    ssh -L 3000:localhost:3001 trilm@35.240.193.89
```

- Kết nối service backend :  
- -Auth service:

```bash
    ssh -L <port>:localhost:<port> <username>@<ip_server>

    Ví dụ hiện tại:

    ssh -L 35000:localhost:35000 trilm@35.240.193.89
```

- -Logistics service:

```bash
    ssh -L <port>:localhost:<port> <username>@<ip_server>

    Ví dụ hiện tại:

    ssh -L 35002:localhost:35002 trilm@35.240.193.89
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
# FE_FCodeTest
