# LaunchLibrary2 SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

LaunchLibrary2Utility.registrar = ->(u) {
  u.clean = LaunchLibrary2Utilities::Clean
  u.done = LaunchLibrary2Utilities::Done
  u.make_error = LaunchLibrary2Utilities::MakeError
  u.feature_add = LaunchLibrary2Utilities::FeatureAdd
  u.feature_hook = LaunchLibrary2Utilities::FeatureHook
  u.feature_init = LaunchLibrary2Utilities::FeatureInit
  u.fetcher = LaunchLibrary2Utilities::Fetcher
  u.make_fetch_def = LaunchLibrary2Utilities::MakeFetchDef
  u.make_context = LaunchLibrary2Utilities::MakeContext
  u.make_options = LaunchLibrary2Utilities::MakeOptions
  u.make_request = LaunchLibrary2Utilities::MakeRequest
  u.make_response = LaunchLibrary2Utilities::MakeResponse
  u.make_result = LaunchLibrary2Utilities::MakeResult
  u.make_point = LaunchLibrary2Utilities::MakePoint
  u.make_spec = LaunchLibrary2Utilities::MakeSpec
  u.make_url = LaunchLibrary2Utilities::MakeUrl
  u.param = LaunchLibrary2Utilities::Param
  u.prepare_auth = LaunchLibrary2Utilities::PrepareAuth
  u.prepare_body = LaunchLibrary2Utilities::PrepareBody
  u.prepare_headers = LaunchLibrary2Utilities::PrepareHeaders
  u.prepare_method = LaunchLibrary2Utilities::PrepareMethod
  u.prepare_params = LaunchLibrary2Utilities::PrepareParams
  u.prepare_path = LaunchLibrary2Utilities::PreparePath
  u.prepare_query = LaunchLibrary2Utilities::PrepareQuery
  u.graphql_body = LaunchLibrary2Utilities::GraphqlBody
  u.graphql_errors = LaunchLibrary2Utilities::GraphqlErrors
  u.result_basic = LaunchLibrary2Utilities::ResultBasic
  u.result_body = LaunchLibrary2Utilities::ResultBody
  u.result_headers = LaunchLibrary2Utilities::ResultHeaders
  u.transform_request = LaunchLibrary2Utilities::TransformRequest
  u.transform_response = LaunchLibrary2Utilities::TransformResponse
}
