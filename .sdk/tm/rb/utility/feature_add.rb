# LaunchLibrary2 SDK utility: feature_add
module LaunchLibrary2Utilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
