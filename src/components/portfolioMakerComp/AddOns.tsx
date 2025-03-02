import { useForm } from "../../hooks/useForm";
import { FaGithub, FaRss, FaFire, FaUserAlt, FaChartLine, FaUsers, FaCodeBranch, FaTrophy, FaStar, FaHeartbeat } from 'react-icons/fa';  // Additional icons

const AddOns: React.FC = () => {
  const { formData, updateAddOnsData } = useForm();

  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateAddOnsData({
      ...formData.addOns,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <div className="bg-transparent  rounded-lg shadow-md text-blue-300 no-scrollbar">
      <div className="p-12 max-h-[400px] overflow-auto no-scrollbar">
        <h2 className="text-xl font-semibold mb-4 text-blue-300">Add-Ons</h2>

        <div className="mb-4 flex items-center">
          <FaGithub className="text-blue-500 mr-2" />
          <label className="flex items-center">
            <input
              type="checkbox"
              name="githubBadges"
              checked={formData.addOns.githubBadges || false}
              onChange={handleToggleChange}
              className="mr-2 accent-blue-500 transition-colors duration-200 ease-in-out"
            />
            <span className="text-blue-300">Display GitHub Stats</span>
          </label>
        </div>

        <div className="mb-4 flex items-center">
          <FaRss className="text-blue-500 mr-2" />
          <label className="flex items-center">
            <input
              type="checkbox"
              name="blogIntegration"
              checked={formData.addOns.blogIntegration || false}
              onChange={handleToggleChange}
              className="mr-2 accent-blue-500 transition-colors duration-200 ease-in-out"
            />
            <span className="text-blue-300">Display Blog Integration</span>
          </label>
        </div>

        {/* Additional GitHub Actions */}
        <div className="mb-4 flex items-center">
          <FaFire className="text-blue-500 mr-2" />
          <label className="flex items-center">
            <input
              type="checkbox"
              name="topLanguages"
              checked={formData.addOns.topLanguages || false}
              onChange={handleToggleChange}
              className="mr-2 accent-blue-500 transition-colors duration-200 ease-in-out"
            />
            <span className="text-blue-300">Display Top Languages Card</span>
          </label>
        </div>

        <div className="mb-4 flex items-center">
          <FaUserAlt className="text-blue-500 mr-2" />
          <label className="flex items-center">
            <input
              type="checkbox"
              name="streakStats"
              checked={formData.addOns.streakStats || false}
              onChange={handleToggleChange}
              className="mr-2 accent-blue-500 transition-colors duration-200 ease-in-out"
            />
            <span className="text-blue-300">Display Streak Stats</span>
          </label>
        </div>

        <div className="mb-4 flex items-center">
          <FaChartLine className="text-blue-500 mr-2" />
          <label className="flex items-center">
            <input
              type="checkbox"
              name="profileViews"
              checked={formData.addOns.profileViews || false}
              onChange={handleToggleChange}
              className="mr-2 accent-blue-500 transition-colors duration-200 ease-in-out"
            />
            <span className="text-blue-300">Display Profile Views Counter</span>
          </label>
        </div>

        <div className="mb-4 flex items-center">
          <FaChartLine className="text-blue-500 mr-2" />
          <label className="flex items-center">
            <input
              type="checkbox"
              name="contributionsGraph"
              checked={formData.addOns.contributionsGraph || false}
              onChange={handleToggleChange}
              className="mr-2 accent-blue-500 transition-colors duration-200 ease-in-out"
            />
            <span className="text-blue-300">Display Contributions Graph</span>
          </label>
        </div>

        {/* New Add-Ons */}

        <div className="mb-4 flex items-center">
          <FaUsers className="text-blue-500 mr-2" />
          <label className="flex items-center">
            <input
              type="checkbox"
              name="followersCount"
              checked={formData.addOns.followersCount || false}
              onChange={handleToggleChange}
              className="mr-2 accent-blue-500 transition-colors duration-200 ease-in-out"
            />
            <span className="text-blue-300">Display Followers Count</span>
          </label>
        </div>

        <div className="mb-4 flex items-center">
          <FaCodeBranch className="text-blue-500 mr-2" />
          <label className="flex items-center">
            <input
              type="checkbox"
              name="repositoryCount"
              checked={formData.addOns.repositoryCount || false}
              onChange={handleToggleChange}
              className="mr-2 accent-blue-500 transition-colors duration-200 ease-in-out"
            />
            <span className="text-blue-300">Display Repository Count</span>
          </label>
        </div>

        <div className="mb-4 flex items-center">
          <FaTrophy className="text-blue-500 mr-2" />
          <label className="flex items-center">
            <input
              type="checkbox"
              name="githubTrophy"
              checked={formData.addOns.githubTrophy || false}
              onChange={handleToggleChange}
              className="mr-2 accent-blue-500 transition-colors duration-200 ease-in-out"
            />
            <span className="text-blue-300">Display GitHub Trophy</span>
          </label>
        </div>

        <div className="mb-4 flex items-center">
          <FaStar className="text-blue-500 mr-2" />
          <label className="flex items-center">
            <input
              type="checkbox"
              name="repositoryStars"
              checked={formData.addOns.repositoryStars || false}
              onChange={handleToggleChange}
              className="mr-2 accent-blue-500 transition-colors duration-200 ease-in-out"
            />
            <span className="text-blue-300">Display Repository Stars</span>
          </label>
        </div>

        <div className="mb-4 flex items-center">
          <FaHeartbeat className="text-blue-500 mr-2" />
          <label className="flex items-center">
            <input
              type="checkbox"
              name="commitStats"
              checked={formData.addOns.commitStats || false}
              onChange={handleToggleChange}
              className="mr-2 accent-blue-500 transition-colors duration-200 ease-in-out"
            />
            <span className="text-blue-300">Display Commit Stats</span>
          </label>
        </div>

        <div className="mb-4 flex items-center">
          <FaStar className="text-blue-500 mr-2" />
          <label className="flex items-center">
            <input
              type="checkbox"
              name="recentActivity"
              checked={formData.addOns.recentActivity || false}
              onChange={handleToggleChange}
              className="mr-2 accent-blue-500 transition-colors duration-200 ease-in-out"
            />
            <span className="text-blue-300">Display Recent Activity</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default AddOns;
