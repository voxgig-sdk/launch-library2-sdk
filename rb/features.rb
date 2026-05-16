# LaunchLibrary2 SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module LaunchLibrary2Features
  def self.make_feature(name)
    case name
    when "base"
      LaunchLibrary2BaseFeature.new
    when "test"
      LaunchLibrary2TestFeature.new
    else
      LaunchLibrary2BaseFeature.new
    end
  end
end
