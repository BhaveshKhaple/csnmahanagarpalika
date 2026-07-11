import { render, screen } from '@testing-library/react';
import * as fs from 'fs';
import * as path from 'path';

// Mock next/image
jest.mock('next/image', () => {
  return function MockImage({ src, alt, priority }: any) {
    return (
      <img
        src={src}
        alt={alt}
        data-priority={priority ? 'true' : 'false'}
      />
    );
  };
});

describe('HeroSection', () => {
  const originalCwd = process.cwd;
  const mockCwdPath = path.join(__dirname, 'mock-cwd');
  const mockSliderPath = path.join(mockCwdPath, 'public', 'images', 'home-slider');

  beforeAll(() => {
    // Setup single slide mock folder structure
    if (!fs.existsSync(mockSliderPath)) {
      fs.mkdirSync(mockSliderPath, { recursive: true });
    }
    fs.writeFileSync(path.join(mockSliderPath, '01_slide.png'), 'dummy data');
  });

  afterAll(() => {
    // Clean up
    if (fs.existsSync(mockCwdPath)) {
      fs.rmSync(mockCwdPath, { recursive: true, force: true });
    }
  });

  beforeEach(() => {
    jest.resetModules();
    process.cwd = originalCwd;
  });

  it('renders fallback saffron background gradient when no slides are found', async () => {
    // Mock cwd to a non-existent path before importing/requiring HeroSection
    process.cwd = jest.fn().mockReturnValue('/non-existent-path');
    
    // Require here fresh after jest.resetModules()
    const HeroSection = require('../hero-section').default;

    const result = await HeroSection();
    render(result);

    expect(screen.getByText('छत्रपती संभाजीनगर महानगरपालिका')).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'CSMC मुख्यपृष्ठ' })).toBeInTheDocument();
  });

  it('renders a single image with priority when 1 slide is found', async () => {
    // Mock cwd to the test-single-slider root path
    process.cwd = jest.fn().mockReturnValue(mockCwdPath);
    
    const HeroSection = require('../hero-section').default;

    const result = await HeroSection();
    render(result);

    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/images/home-slider/01_slide.png');
    expect(img).toHaveAttribute('data-priority', 'true');
    expect(screen.getByRole('region', { name: 'Home image slider' })).toBeInTheDocument();
  });

  it('renders multiple slides with delays and only first having priority', async () => {
    // Let it use the original cwd containing the real slider images
    const HeroSection = require('../hero-section').default;

    const result = await HeroSection();
    render(result);

    const images = screen.getAllByRole('img');
    // Ensure we render the correct number of slides from the repository
    expect(images.length).toBeGreaterThan(1);

    // Verify first slide has priority
    expect(images[0]).toHaveAttribute('data-priority', 'true');

    // Verify subsequent slides do not have priority
    for (let i = 1; i < images.length; i++) {
      expect(images[i]).toHaveAttribute('data-priority', 'false');
    }
  });
});
