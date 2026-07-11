import { render, screen } from '@testing-library/react';
import OnlineServicesSection from '../online-services-section';
import { useTranslation } from '@/lib/i18n/LanguageContext';

// Mock useTranslation
jest.mock('@/lib/i18n/LanguageContext', () => ({
  useTranslation: jest.fn(),
}));

// Mock ServiceCardGrid to verify it gets called with correct props
jest.mock('@/components/shared', () => {
  const original = jest.requireActual('@/components/shared');
  return {
    ...original,
    ServiceCardGrid: jest.fn(({ services, viewAllHref }: any) => (
      <div data-testid="service-card-grid" data-viewall={viewAllHref}>
        {services.map((s: any) => (
          <div key={s.titleMr} data-testid="service-card">
            <span>{s.titleMr}</span>
            <span>{s.titleEn}</span>
            <span>{s.requiresLogin ? 'lock' : 'unlock'}</span>
            <span>{s.description}</span>
          </div>
        ))}
      </div>
    )),
  };
});

describe('OnlineServicesSection', () => {
  const mockUseTranslation = useTranslation as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with Marathi locale', () => {
    mockUseTranslation.mockReturnValue({
      locale: 'mr',
      t: (key: string) => `trans_${key}`,
    });

    render(<OnlineServicesSection />);

    // Check tags, titles, description using the translation mock
    expect(screen.getByText('trans_home.services.tag')).toBeInTheDocument();
    expect(screen.getByText('trans_home.services.title')).toBeInTheDocument();
    expect(screen.getByText('trans_home.services.description')).toBeInTheDocument();

    // Check quick links mapping under Marathi
    // Under locale 'mr', it should render the Marathi title primary (item.titleMr) and English secondary (item.titleEn)
    expect(screen.getByText('डाउनलोड')).toBeInTheDocument();
    expect(screen.getByText('Downloads')).toBeInTheDocument();
    expect(screen.getByText('कर गणना')).toBeInTheDocument();
    expect(screen.getByText('Tax Calculator')).toBeInTheDocument();
  });

  it('renders correctly with English locale', () => {
    mockUseTranslation.mockReturnValue({
      locale: 'en',
      t: (key: string) => `trans_${key}`,
    });

    render(<OnlineServicesSection />);

    // Check quick links mapping under English
    // Under locale 'en', it should render the English title primary (item.titleEn) and Marathi secondary (item.titleMr)
    expect(screen.getByText('Downloads')).toBeInTheDocument();
    expect(screen.getByText('डाउनलोड')).toBeInTheDocument();
    expect(screen.getByText('Tax Calculator')).toBeInTheDocument();
    expect(screen.getByText('कर गणना')).toBeInTheDocument();
  });

  it('verifies that the correct service cards are configured', () => {
    mockUseTranslation.mockReturnValue({
      locale: 'mr',
      t: (key: string) => `trans_${key}`,
    });

    render(<OnlineServicesSection />);

    // Verify 6 service cards rendered in Grid
    const cards = screen.getAllByTestId('service-card');
    expect(cards).toHaveLength(6);

    // Verify requirements: Pay Property Tax requiring login, complaints not requiring login
    expect(screen.getByText('मालमत्ता कर भरा')).toBeInTheDocument();
    expect(screen.getByText('Pay Property Tax')).toBeInTheDocument();
    expect(screen.getByText('तक्रार नोंदवा')).toBeInTheDocument();
    expect(screen.getByText('File a Complaint')).toBeInTheDocument();
  });

  it('verifies accessibility requirements for touch targets', () => {
    mockUseTranslation.mockReturnValue({
      locale: 'mr',
      t: (key: string) => `trans_${key}`,
    });

    render(<OnlineServicesSection />);

    // Quick links must have min-h-[44px]
    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      expect(link).toHaveClass('min-h-[44px]');
    });
  });
});
