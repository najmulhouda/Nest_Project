import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'pg-1aa959e8-najmulhouda6-71c4.g.aivencloud.com',
  port: 24323,
  username: 'avnadmin',
  password: 'AVNS_Ux-qE3sXFBdZXpSRR6H',
  database: 'db',
  // extra: {
  //   ssl: 'true',
  // },
  ssl: {
    rejectUnauthorized: false,
    ca: 'MIIEQTCCAqmgAwIBAgIUcr4wD8/VcNkDPR+zqwmHWiNyVfkwDQYJKoZIhvcNAQEMBQAwOjE4MDYGA1UEAwwvZDkyNDY1YzEtYzE5Yi00YjFiLWFlNmMtYmExNTU1NmJhNGI0IFByb2plY3QgQ0EwHhcNMjQwNjEzMDcwODEzWhcNMzQwNjExMDcwODEzWjA6MTgwNgYDVQQDDC9kOTI0NjVjMS1jMTliLTRiMWItYWU2Yy1iYTE1NTU2YmE0YjQgUHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBALS0U30VLZOCNGnZnQ3+HUHIev75u+BKjEsvI8fg2fcMxjxI1f4+LLZn0mysS8khWyLvK9AOSbIyfYUQW8a0d2rhEnbUtV/gIwUkBwtP+zl9EbkL1hB4cpZLPlfT1HWMOxYGXTT18xF9nKL3zVgkwA1vjfzCFMM4YT14Z1wirtm8TofkZJ3tKuZdH1wHXTmqFtDLarGUHPanWKRQhjYzUvmVzKsyVy/79uLg1nbw8CF9cDaFYMs2NAVfnpp1N/3mqUj6zhQhvdjbB7dvDhLdEv+WXR8BL4BKrovmSue5I2B9r7hTHdF6f4+G0OJMygPInWaoBltv9awRtPETsRGWmief36K0l4D65SeD+Mfp8c9jN4p/WjebWq7E14lZg7LPVKO1ggYWhOV11l4nrcxlprbHfzGDSV3/UlJydsq7SQ5HaIp63hLe6RCeeQVTNq7ZlVvB3NFv2ceKBMc+CvbNuBXNQzDlZ7rr8KH1ZsVw3mv35NKlejIcdPBK/0+dcsHh6wIDAQABoz8wPTAdBgNVHQ4EFgQUD3etmdIljdv2ZOJpwCycouOgPmAwDwYDVR0TBAgwBgEB/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAGzGhOMUn5G6Q+o+SCsZwqrosRwLTOSYtrHoF3KG3pExL2Y9qz8od1NQC/rdbiVyHj/0BzFwvwxAb2stGMUAtVzCI7KyXu5PuLAK3Ikhoa51WEVvvWIJZDUN/XdMJir7YJTqMWjPPRTxS7ZrzLVlEPZlx0KBjmb+fUkq6lxdQoNA+GDz+XLpMzjVbjR/hpaEbylo4j/OkXfAbyTgvZSiQ+dPJGKpoYnUI1F6u+NOdirrD7xJSeMhoB0VK1Hfd5OdXnNhLT5Lu6+aqLGTtANEkqg9sunEmu6ReFvO+yPTAmycEJ5iVXjesqtR1CFxEnw09B91VSjIfOOxnjM6ek8omJa9A+UqaO2z0d0eNZ8AEX4L8kxVzPbqeBsL+GM1UIjqGLchaZfYBN+PIX5Hd5F6fzXDyBbWMyA2/n5P1oYU36uqyECyPAPbaiLfk4jGm5Cu6ynNEyje065TRUSHTvQT+a6wjuRWW2ZvMbSuBxTU0tx18QqJaltbo5vaP05mjfWdhw==',
  },
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
