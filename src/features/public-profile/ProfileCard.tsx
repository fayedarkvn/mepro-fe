import profilePicture from '@/assets/profile-card-picture.jpg';
import './profile-card.css';

function ProfileCard() {
  const email = 'trieu@fayedark.com';
  const name = 'Triệu';
  const fullName = 'Trương Quốc Triệu';
  const title = 'Software Engineer';
  const org = 'AI4LIFE';
  const stats = {
    projects: 42,
    followers: 985,
    following: 12,
  };
  const cellPhone = '+84 382721049';
  const url = 'https://mepro.fayedark.com/u/ntdm11';
  const socialUrl = 'https://fb.com/ntdm11';
  const workAddress = ';;1 Đại Cồ Việt, Thư viện Tạ Quang Bửu, Hà Nội, 112400, Việt Nam';

  const generateVCF = () => {
    // Create VCF content
    const vcfContent = `BEGIN:VCARD
VERSION:3.0
N:;${name};;;
FN:${fullName}
ORG:${org}
TITLE:${title}
TEL;TYPE=CELL:${cellPhone}
EMAIL:${email}
ADR;TYPE=WORK:${workAddress}
URL:${url}
END:VCARD`;

    // Create a Blob with the VCF content
    const blob = new Blob([vcfContent], { type: 'text/vcard' });

    // Create a download link
    const linkUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = linkUrl;
    link.setAttribute('download', `${name.replace(/\s+/g, '_')}.vcf`);

    // Append to body, click and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const onPrimaryButtonClick = () => {
    window.open(socialUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="card">
      <div className="card-content">
        <div className="card-image">
          <div className="card-image-container">
            <img src={profilePicture} alt={`${name}'s profile`} />
          </div>
          <div className="card-glow"></div>
        </div>
        <div className="card-info">
          <h2 className="card-name">{name}</h2>
          <p className="card-title">{title}</p>
          <div className="flex justify-between items-center mb-12">
            <p className="card-bio">{email}</p>
          </div>

          <div className="card-stats">
            <div className="stat">
              <span className="stat-value">{stats.projects}</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat">
              <span className="stat-value">{stats.followers}</span>
              <span className="stat-label">Followers</span>
            </div>
            <div className="stat">
              <span className="stat-value">{stats.following}</span>
              <span className="stat-label">Following</span>
            </div>
          </div>

          <div className="card-actions">
            <button className="action-button primary" onClick={onPrimaryButtonClick}>
              <span>Follow</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <line x1="20" y1="8" x2="20" y2="14"></line>
                <line x1="23" y1="11" x2="17" y2="11"></line>
              </svg>
            </button>
            <button className="action-button secondary" onClick={generateVCF}>
              <span>Save contact</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
