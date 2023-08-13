package security;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UserWithoutId (
        @NotBlank
        @Size(min = 3, max = 25, message = "A length between 3 and 25 characters is mandatory.")
        @Pattern(regexp = "\\S*", message = "Whitespace is not allowed")
        String username,

        @NotBlank
        @Size(min = 3, max = 25, message = "A length between 3 and 25 characters is mandatory.")
        String password
) {
}
