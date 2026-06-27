# Contributing to Smart Municipal Citizen Portal

Thank you for considering contributing to the Smart Municipal Citizen Portal! This document provides guidelines and instructions for contributing.

## Code of Conduct

### Our Pledge
We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

## How Can I Contribute?

### Reporting Bugs
Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title** - Use a descriptive title
- **Description** - Detailed description of the issue
- **Steps to reproduce** - Step-by-step instructions
- **Expected behavior** - What you expected to happen
- **Actual behavior** - What actually happened
- **Screenshots** - If applicable
- **Environment** - OS, browser, versions, etc.

### Suggesting Enhancements
Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear title** - Use a descriptive title
- **Description** - Detailed description of the enhancement
- **Use case** - Why this enhancement would be useful
- **Mockups** - If applicable

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Follow coding standards** - See below
3. **Write clear commit messages** - Use conventional commits
4. **Add tests** - Ensure your changes are tested
5. **Update documentation** - Keep docs up to date
6. **Ensure CI passes** - All checks must pass

## Development Workflow

### Setup Development Environment

```bash
# Clone your fork
git clone https://github.com/YOUR-USERNAME/smart-municipal-portal.git
cd smart-municipal-portal

# Install dependencies
npm install

# Start development environment
docker-compose up -d
```

### Branch Naming Convention

- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `hotfix/description` - Urgent fixes
- `refactor/description` - Code refactoring
- `docs/description` - Documentation updates

### Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(complaints): add video upload support
fix(auth): resolve JWT refresh token expiration
docs(api): update authentication endpoints
```

## Coding Standards

### TypeScript/JavaScript

```typescript
// Use strict TypeScript
// Enable all strict checks in tsconfig.json

// Naming conventions
class MyClass {}              // PascalCase for classes
interface IMyInterface {}     // PascalCase with I prefix for interfaces
type MyType = {};            // PascalCase for types
const MY_CONSTANT = 'value'; // UPPER_SNAKE_CASE for constants
const myVariable = 'value';  // camelCase for variables
function myFunction() {}     // camelCase for functions

// Use async/await over promises
async function fetchData() {
  try {
    const data = await apiCall();
    return data;
  } catch (error) {
    handleError(error);
  }
}

// Prefer const over let
const items = [];

// Use template literals
const message = `Hello, ${name}!`;

// Use optional chaining
const value = user?.profile?.email;
```

### React/Next.js

```typescript
// Use functional components with TypeScript
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  disabled = false 
}) => {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      {label}
    </button>
  );
};

// Use custom hooks for reusable logic
function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  // ...
  return { user, login, logout };
}
```

### NestJS

```typescript
// Use dependency injection
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }
}

// Use DTOs for validation
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}

// Use proper error handling
@Get(':id')
async findOne(@Param('id') id: string) {
  const user = await this.userService.findOne(id);
  if (!user) {
    throw new NotFoundException(`User with ID ${id} not found`);
  }
  return user;
}
```

### CSS/Tailwind

```tsx
// Use Tailwind utility classes
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
  <h2 className="text-xl font-bold text-gray-800">Title</h2>
  <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600">
    Action
  </button>
</div>

// Group related classes
<div className={cn(
  "base-classes",
  isActive && "active-classes",
  isDisabled && "disabled-classes"
)}>
```

## Testing

### Writing Tests

```typescript
// Unit tests
describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const dto = { name: 'John', email: 'john@example.com' };
    const result = await service.create(dto);
    expect(result).toHaveProperty('id');
    expect(result.name).toBe(dto.name);
  });
});

// Integration tests
describe('User API', () => {
  it('POST /users should create a user', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .send({ name: 'John', email: 'john@example.com' })
      .expect(201);

    expect(response.body).toHaveProperty('id');
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov

# Run e2e tests
npm run test:e2e
```

## Documentation

### Code Comments

```typescript
/**
 * Calculates property tax based on property details
 * 
 * @param propertyId - Unique property identifier
 * @param year - Tax year
 * @returns Calculated tax amount
 * @throws NotFoundException if property not found
 */
async calculatePropertyTax(
  propertyId: string, 
  year: number
): Promise<number> {
  // Implementation
}
```

### API Documentation

Use Swagger/OpenAPI annotations:

```typescript
@ApiTags('users')
@Controller('users')
export class UserController {
  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
}
```

## Security

- Never commit sensitive data (API keys, passwords, etc.)
- Always validate and sanitize user input
- Use parameterized queries to prevent SQL injection
- Implement proper authentication and authorization
- Follow OWASP security guidelines
- Report security vulnerabilities privately

## Performance

- Optimize database queries (use indexes, avoid N+1)
- Implement caching where appropriate
- Use lazy loading for images and components
- Minimize bundle size (code splitting)
- Follow performance best practices

## Accessibility

- Use semantic HTML
- Add ARIA labels where needed
- Ensure keyboard navigation works
- Test with screen readers
- Maintain color contrast ratios (WCAG AA)
- Provide alt text for images

## Review Process

1. **Self-review** - Review your own changes first
2. **Automated checks** - Ensure CI passes
3. **Peer review** - Wait for code review approval
4. **Address feedback** - Make requested changes
5. **Final approval** - Get approval from maintainers
6. **Merge** - Squash and merge into main

## Questions?

If you have questions, please:
- Check existing documentation
- Search closed issues
- Open a new discussion
- Contact maintainers

Thank you for contributing! 🎉
