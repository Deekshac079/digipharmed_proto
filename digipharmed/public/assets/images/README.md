# Public Assets - Images

This folder contains placeholder and static images used throughout the application.

## Folder Structure

```
public/
└── assets/
    └── images/
        ├── image.png                   # Sample/default image file
        ├── placeholder-avatar.svg      # Profile photo placeholder
        ├── placeholder-document.svg    # Document/certificate placeholder
        └── placeholder-upload.svg      # File upload placeholder
```

## Available Images

| Image | Use Case | Type |
|-------|----------|------|
| `image.png` | Sample/default faculty image | PNG |
| `placeholder-avatar.svg` | Faculty/staff profile photos | SVG |
| `placeholder-document.svg` | Document/certificate display | SVG |
| `placeholder-upload.svg` | File upload indication | SVG |

## Usage Examples

### In React Components

```jsx
// Using image.png as default
<img src="/assets/images/image.png" alt="Faculty" />

// Placeholder avatar when no profile photo available
<img src="/assets/images/placeholder-avatar.svg" alt="No profile photo" />

// With fallback on error
<img 
  src={profilePath}
  alt="Profile"
  onError={(e) => {
    e.target.src = '/assets/images/image.png';
  }}
/>
```

### In HOISection Component

```jsx
<img 
  src={hoi.profilePhoto || '/assets/images/image.png'}
  alt={hoi.name}
  className="faculty-photo"
/>
```

### In CSS

```css
.profile-photo {
  background-image: url('/assets/images/image.png');
  background-size: cover;
}
```

## Adding New Images

1. Place image files in this folder
2. Reference in code as: `/assets/images/filename.ext`
3. Update this README with usage information

## Format Guidelines

- **SVG Format**: Preferred for scalability and small file size
- **PNG Format**: Use for photographs and detailed graphics
- **Max Size**: Keep file sizes under 500KB for web optimization
