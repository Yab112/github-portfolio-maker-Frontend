import React from 'react';
import { useForm } from '../../hooks/useForm';
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';

const SocialLinks: React.FC = () => {
  const { formData, updateSocialData } = useForm();

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedLinks = [...formData.social.socialLinks];
    updatedLinks[index] = { ...updatedLinks[index], url: e.target.value };

    updateSocialData({
      ...formData.social,
      socialLinks: updatedLinks,
    });
  };

  const socialPlatforms = [
    { name: 'GitHub', icon: <FaGithub />, placeholder: 'https://github.com/username' },
    { name: 'Twitter', icon: <FaTwitter />, placeholder: 'https://twitter.com/username' },
    { name: 'LinkedIn', icon: <FaLinkedin />, placeholder: 'https://linkedin.com/in/username' },
    { name: 'Instagram', icon: <FaInstagram />, placeholder: 'https://instagram.com/username' },
    { name: 'Facebook', icon: <FaFacebook />, placeholder: 'https://facebook.com/username' },
    { name: 'YouTube', icon: <FaYoutube />, placeholder: 'https://youtube.com/c/username' },
  ];

  return (
    <div className="bg-transparent text-blue-300 p-6 rounded-lg shadow-md no-scrollbar">
      <h2 className="text-xl font-semibold mb-4">Social Links</h2>

      {socialPlatforms.map((platform, index) => (
        <div className="mb-4 flex items-center space-x-2" key={platform.name}>
          <span className="text-2xl text-blue-700">{platform.icon}</span>
          <div className="w-full">
            <label className="block text-sm font-medium">{platform.name}</label>
            <input
              type="url"
              name={platform.name.toLowerCase()}
              value={formData.social.socialLinks[index]?.url || ''}
              onChange={(e) => handleLinkChange(e, index)}
              className="mt-2 p-2 border border-gray-300 rounded w-full"
              placeholder={platform.placeholder}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SocialLinks;
