---
applyTo: backend/**
---

# Copilot Custom Instructions for Backend (Java 21 + Spring Boot)

These instructions apply to all code and contributions within the `backend/` folder of this repository.

## Project Overview
- **Java Version:** Java 21 with modern language features
- **Framework:** Spring Boot 3.x with Spring Data JPA
- **Database:** H2 for development, configurable for production (PostgreSQL/MySQL)
- **Build Tool:** Maven with standardized dependency management
- **Architecture:** Layered architecture (Controller → Service → Repository → Entity)

## Project Structure Standards
```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/ecommerce/giftvoucher/
│   │   │   ├── GiftVoucherApplication.java       # Main Spring Boot application
│   │   │   ├── controller/                       # REST API controllers
│   │   │   │   ├── ProductController.java
│   │   │   │   ├── VoucherController.java
│   │   │   │   └── dto/                         # Data Transfer Objects
│   │   │   ├── service/                         # Business logic layer
│   │   │   │   ├── ProductService.java
│   │   │   │   ├── VoucherService.java
│   │   │   │   └── impl/                        # Service implementations
│   │   │   ├── repository/                      # Data access layer
│   │   │   │   ├── ProductRepository.java
│   │   │   │   └── VoucherRepository.java
│   │   │   ├── model/                           # JPA entities
│   │   │   │   ├── Product.java
│   │   │   │   ├── Voucher.java
│   │   │   │   └── BaseEntity.java              # Common entity fields
│   │   │   ├── config/                          # Configuration classes
│   │   │   │   ├── DatabaseConfig.java
│   │   │   │   ├── SecurityConfig.java
│   │   │   │   └── WebConfig.java
│   │   │   ├── exception/                       # Custom exceptions
│   │   │   │   ├── GlobalExceptionHandler.java
│   │   │   │   ├── ResourceNotFoundException.java
│   │   │   │   └── ValidationException.java
│   │   │   └── util/                            # Utility classes
│   │   └── resources/
│   │       ├── application.properties           # Main configuration
│   │       ├── application-dev.properties       # Development profile
│   │       ├── application-prod.properties      # Production profile
│   │       └── data.sql                         # Initial data setup
│   └── test/
│       └── java/com/ecommerce/giftvoucher/
│           ├── controller/                      # Controller tests
│           ├── service/                         # Service tests
│           ├── repository/                      # Repository tests
│           └── integration/                     # Integration tests
├── pom.xml                                      # Maven configuration
└── Dockerfile                                   # Container configuration
```

## Coding Standards & Best Practices
### Java 21 Modern Features
```java
// ✅ Good: Use modern Java features
public class ProductService {
    
    // Records for DTOs
    public record ProductDto(String name, BigDecimal price, String description) {}
    
    // Pattern matching with switch expressions
    public String getProductCategory(Product product) {
        return switch (product.getType()) {
            case FURNITURE -> "Home & Living";
            case ELECTRONICS -> "Technology";
            case CLOTHING -> "Fashion";
            default -> "General";
        };
    }
    
    // Text blocks for multi-line strings
    private static final String COMPLEX_QUERY = """
        SELECT p FROM Product p 
        WHERE p.active = true 
        AND p.category = :category 
        ORDER BY p.createdDate DESC
        """;
}
```

### Spring Boot Best Practices
#### Controller Layer
```java
@RestController
@RequestMapping("/api/products")
@Validated
@CrossOrigin(origins = "${app.cors.allowed-origins}")
public class ProductController {
    
    private final ProductService productService;
    
    // Constructor injection (preferred over field injection)
    public ProductController(ProductService productService) {
        this.productService = productService;
    }
    
    @GetMapping
    public ResponseEntity<List<ProductDto>> getAllProducts(
            @RequestParam(defaultValue = "0") @Min(0) int page,
            @RequestParam(defaultValue = "10") @Min(1) @Max(100) int size) {
        
        List<ProductDto> products = productService.getAllProducts(page, size);
        return ResponseEntity.ok(products);
    }
    
    @PostMapping
    public ResponseEntity<ProductDto> createProduct(
            @Valid @RequestBody CreateProductRequest request) {
        
        ProductDto product = productService.createProduct(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(product);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProduct(@PathVariable Long id) {
        return productService.getProductById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
```

#### Service Layer
```java
@Service
@Transactional(readOnly = true)
public class ProductService {
    
    private final ProductRepository productRepository;
    private final VoucherService voucherService;
    
    public ProductService(ProductRepository productRepository, VoucherService voucherService) {
        this.productRepository = productRepository;
        this.voucherService = voucherService;
    }
    
    public List<ProductDto> getAllProducts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findAllByActiveTrue(pageable)
                .stream()
                .map(this::convertToDto)
                .toList();
    }
    
    @Transactional
    public ProductDto createProduct(CreateProductRequest request) {
        Product product = Product.builder()
                .name(request.name())
                .price(request.price())
                .description(request.description())
                .active(true)
                .build();
        
        Product savedProduct = productRepository.save(product);
        return convertToDto(savedProduct);
    }
    
    private ProductDto convertToDto(Product product) {
        return new ProductDto(
                product.getId(),
                product.getName(),
                product.getPrice(),
                product.getDescription()
        );
    }
}
```

#### Entity Layer
```java
@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product extends BaseEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 100)
    @NotBlank(message = "Product name is required")
    private String name;
    
    @Column(nullable = false, precision = 10, scale = 2)
    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than 0")
    private BigDecimal price;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Builder.Default
    @Column(nullable = false)
    private Boolean active = true;
    
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Voucher> vouchers = new ArrayList<>();
}

// Base entity for common fields
@MappedSuperclass
@Data
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseEntity {
    
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdDate;
    
    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime lastModifiedDate;
    
    @CreatedBy
    @Column(length = 50, updatable = false)
    private String createdBy;
    
    @LastModifiedBy
    @Column(length = 50)
    private String lastModifiedBy;
}
```

#### Repository Layer
```java
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    Page<Product> findAllByActiveTrue(Pageable pageable);
    
    List<Product> findByNameContainingIgnoreCase(String name);
    
    @Query("SELECT p FROM Product p WHERE p.price BETWEEN :minPrice AND :maxPrice")
    List<Product> findByPriceRange(@Param("minPrice") BigDecimal minPrice, 
                                   @Param("maxPrice") BigDecimal maxPrice);
    
    @Modifying
    @Query("UPDATE Product p SET p.active = false WHERE p.id = :id")
    int softDeleteById(@Param("id") Long id);
}
```

## Testing Standards
### Unit Testing
```java
@ExtendWith(MockitoExtension.class)
class ProductServiceTest {
    
    @Mock
    private ProductRepository productRepository;
    
    @InjectMocks
    private ProductService productService;
    
    @Test
    @DisplayName("Should return all active products")
    void shouldReturnAllActiveProducts() {
        // Given
        Product product = Product.builder()
                .id(1L)
                .name("Test Product")
                .price(BigDecimal.valueOf(99.99))
                .active(true)
                .build();
        
        Page<Product> productPage = new PageImpl<>(List.of(product));
        when(productRepository.findAllByActiveTrue(any(Pageable.class)))
                .thenReturn(productPage);
        
        // When
        List<ProductDto> result = productService.getAllProducts(0, 10);
        
        // Then
        assertThat(result).hasSize(1);
        assertThat(result.get(0).name()).isEqualTo("Test Product");
        verify(productRepository).findAllByActiveTrue(any(Pageable.class));
    }
}
```

### Integration Testing
```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(properties = {
        "spring.datasource.url=jdbc:h2:mem:testdb",
        "spring.jpa.hibernate.ddl-auto=create-drop"
})
class ProductControllerIntegrationTest {
    
    @Autowired
    private TestRestTemplate restTemplate;
    
    @Autowired
    private ProductRepository productRepository;
    
    @BeforeEach
    void setUp() {
        productRepository.deleteAll();
    }
    
    @Test
    @DisplayName("Should create product successfully")
    void shouldCreateProductSuccessfully() {
        // Given
        CreateProductRequest request = new CreateProductRequest(
                "Test Product", 
                BigDecimal.valueOf(99.99), 
                "Test Description"
        );
        
        // When
        ResponseEntity<ProductDto> response = restTemplate.postForEntity(
                "/api/products", 
                request, 
                ProductDto.class
        );
        
        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().name()).isEqualTo("Test Product");
    }
}
```

## Exception Handling
```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFound(ResourceNotFoundException ex) {
        ErrorResponse error = ErrorResponse.builder()
                .status(HttpStatus.NOT_FOUND.value())
                .message(ex.getMessage())
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ValidationErrorResponse> handleValidationErrors(
            MethodArgumentNotValidException ex) {
        
        List<FieldError> fieldErrors = ex.getBindingResult().getFieldErrors()
                .stream()
                .map(error -> new FieldError(error.getField(), error.getDefaultMessage()))
                .toList();
        
        ValidationErrorResponse response = ValidationErrorResponse.builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .message("Validation failed")
                .fieldErrors(fieldErrors)
                .timestamp(LocalDateTime.now())
                .build();
        
        return ResponseEntity.badRequest().body(response);
    }
}
```

## Configuration Management
### Application Properties
```properties
# application.properties (base configuration)
spring.application.name=gift-voucher-backend
server.port=8080

# Database Configuration
spring.datasource.url=jdbc:h2:mem:devdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# JPA Configuration
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.format_sql=true

# H2 Console (development only)
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# Actuator Configuration
management.endpoints.web.exposure.include=health,info,metrics
management.endpoint.health.show-details=when-authorized

# CORS Configuration
app.cors.allowed-origins=http://localhost:3000,http://localhost:5173

# API Documentation
springdoc.api-docs.path=/api-docs
springdoc.swagger-ui.path=/swagger-ui.html
```

### Environment-Specific Configuration
```properties
# application-prod.properties
spring.datasource.url=${DATABASE_URL}
spring.datasource.username=${DATABASE_USERNAME}
spring.datasource.password=${DATABASE_PASSWORD}
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false
spring.h2.console.enabled=false

# Security
app.cors.allowed-origins=${ALLOWED_ORIGINS:http://localhost:3000}
```

## Security Standards
### Input Validation
```java
public class CreateProductRequest {
    
    @NotBlank(message = "Product name is required")
    @Size(min = 1, max = 100, message = "Product name must be between 1 and 100 characters")
    private String name;
    
    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than 0")
    @Digits(integer = 8, fraction = 2, message = "Price must have at most 8 integer digits and 2 fraction digits")
    private BigDecimal price;
    
    @Size(max = 1000, message = "Description must not exceed 1000 characters")
    private String description;
}
```

### SQL Injection Prevention
- Always use parameterized queries or JPQL
- Use `@Query` with named parameters
- Validate and sanitize all user inputs
- Use Spring Data JPA query methods when possible

### Data Protection
```java
@Entity
public class User {
    
    @Column(nullable = false, unique = true)
    @Email(message = "Invalid email format")
    private String email;
    
    @JsonIgnore  // Never serialize passwords
    @Column(nullable = false)
    private String password;
    
    // Use @JsonView for different serialization contexts
    @JsonView(Views.Public.class)
    private String firstName;
    
    @JsonView(Views.Internal.class)
    private String internalNotes;
}
```

## Performance & Monitoring
### Database Optimization
```java
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    // Use fetch joins to avoid N+1 queries
    @Query("SELECT p FROM Product p LEFT JOIN FETCH p.vouchers WHERE p.id = :id")
    Optional<Product> findByIdWithVouchers(@Param("id") Long id);
    
    // Use pagination for large datasets
    @Query("SELECT p FROM Product p WHERE p.category = :category")
    Page<Product> findByCategory(@Param("category") String category, Pageable pageable);
    
    // Use projections for specific data
    @Query("SELECT p.id, p.name, p.price FROM Product p WHERE p.active = true")
    List<ProductSummary> findActiveProductSummaries();
    
    interface ProductSummary {
        Long getId();
        String getName();
        BigDecimal getPrice();
    }
}
```

### Caching Strategy
```java
@Service
@CacheConfig(cacheNames = "products")
public class ProductService {
    
    @Cacheable(key = "#id")
    public Optional<ProductDto> getProductById(Long id) {
        return productRepository.findById(id)
                .map(this::convertToDto);
    }
    
    @CacheEvict(key = "#result.id")
    public ProductDto updateProduct(Long id, UpdateProductRequest request) {
        // Update logic
    }
    
    @CacheEvict(allEntries = true)
    public void clearProductCache() {
        // Clear all cached products
    }
}
```

## API Documentation
### OpenAPI/Swagger Integration
```java
@RestController
@Tag(name = "Products", description = "Product management operations")
public class ProductController {
    
    @Operation(
        summary = "Get all products",
        description = "Retrieve a paginated list of all active products"
    )
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Products retrieved successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid pagination parameters")
    })
    @GetMapping
    public ResponseEntity<List<ProductDto>> getAllProducts(
            @Parameter(description = "Page number (0-based)", example = "0")
            @RequestParam(defaultValue = "0") int page,
            
            @Parameter(description = "Page size", example = "10")
            @RequestParam(defaultValue = "10") int size) {
        // Implementation
    }
}
```

## Build & Deployment
### Maven Configuration Best Practices
```xml
<properties>
    <maven.compiler.source>21</maven.compiler.source>
    <maven.compiler.target>21</maven.compiler.target>
    <spring-boot.version>3.2.0</spring-boot.version>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
</properties>

<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-dependencies</artifactId>
            <version>${spring-boot.version}</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

### Docker Configuration
```dockerfile
# Multi-stage build for production optimization
FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/actuator/health || exit 1
ENTRYPOINT ["java", "-jar", "app.jar"]
```

---

*This file should be updated as backend standards and Spring Boot best practices evolve.*
