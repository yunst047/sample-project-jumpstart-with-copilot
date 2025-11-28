# Asset Recording System

A Next.js application for managing persons and their assets, using SQLite database, containerized with Docker, and deployable on AWS EC2 using Terraform.

## Features

- **Person Management**: Create, read, update, and delete person records
- **Asset Management**: Track assets linked to persons with values and acquisition dates
- **SQLite Database**: Lightweight, file-based database for data persistence
- **Docker Support**: Containerized application for easy deployment
- **Terraform**: Infrastructure as Code for AWS EC2 deployment

## Database Schema

### Persons Table
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key, auto-increment |
| name | TEXT | Person's name |
| email | TEXT | Unique email address |
| phone | TEXT | Optional phone number |
| created_at | DATETIME | Record creation timestamp |

### Assets Table
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key, auto-increment |
| person_id | INTEGER | Foreign key to persons table |
| name | TEXT | Asset name |
| description | TEXT | Optional description |
| value | REAL | Asset value in USD |
| acquired_date | DATE | Date asset was acquired |
| created_at | DATETIME | Record creation timestamp |

## Getting Started

### Prerequisites
- Node.js 20+
- npm
- Docker (for containerized deployment)
- Terraform (for AWS deployment)

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser.

### Docker Deployment

1. Build and run with Docker Compose:
```bash
docker-compose up -d --build
```

2. Access the application at [http://localhost:3000](http://localhost:3000)

3. Stop the application:
```bash
docker-compose down
```

### AWS EC2 Deployment with Terraform

1. Navigate to the terraform directory:
```bash
cd terraform
```

2. Initialize Terraform:
```bash
terraform init
```

3. Create a `terraform.tfvars` file:
```hcl
aws_region    = "us-east-1"
instance_type = "t3.micro"
key_name      = "your-ssh-key-name"
app_name      = "asset-recording-app"
```

4. Plan the deployment:
```bash
terraform plan
```

5. Apply the configuration:
```bash
terraform apply
```

6. SSH into the instance and deploy the application:
```bash
ssh -i your-key.pem ec2-user@<instance-public-ip>
cd /home/ec2-user/app
git clone <your-repo-url> .
docker-compose up -d --build
```

7. Access the application at `http://<instance-public-ip>:3000`

## API Endpoints

### Persons
- `GET /api/persons` - List all persons
- `POST /api/persons` - Create a new person
- `GET /api/persons/:id` - Get a specific person
- `PUT /api/persons/:id` - Update a person
- `DELETE /api/persons/:id` - Delete a person

### Assets
- `GET /api/assets` - List all assets
- `POST /api/assets` - Create a new asset
- `GET /api/assets/:id` - Get a specific asset
- `PUT /api/assets/:id` - Update an asset
- `DELETE /api/assets/:id` - Delete an asset

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── persons/      # Person API routes
│   │   │   └── assets/       # Asset API routes
│   │   ├── persons/          # Persons page
│   │   ├── assets/           # Assets page
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Home page
│   ├── lib/
│   │   └── db.ts             # Database utilities
│   └── types/
│       └── index.ts          # TypeScript types
├── terraform/                # Terraform configurations
│   ├── main.tf
│   ├── variables.tf
│   ├── ec2.tf
│   └── outputs.tf
├── data/                     # SQLite database directory
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| DATABASE_PATH | Path to SQLite database file | `./data/app.db` |
| NODE_ENV | Environment mode | `development` |

## License

MIT
