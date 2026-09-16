# LaunchLibrary2 SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module LaunchLibrary2Features
  def self.make_feature(name)
    case name
    when "base"
      LaunchLibrary2BaseFeature.new
    when "ratelimit"
      LaunchLibrary2RatelimitFeature.new
    when "retry"
      LaunchLibrary2RetryFeature.new
    when "test"
      LaunchLibrary2TestFeature.new
    when "timeout"
      LaunchLibrary2TimeoutFeature.new
    else
      LaunchLibrary2BaseFeature.new
    end
  end
end
