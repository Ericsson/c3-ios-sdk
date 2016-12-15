#
# Be sure to run `pod lib lint C3Lib.podspec' to ensure this is a
# valid spec before submitting.
#
# Any lines starting with a # are optional, but their use is encouraged
# To learn more about a Podspec see http://guides.cocoapods.org/syntax/podspec.html
#

Pod::Spec.new do |s|
  s.name             = 'C3Lib'
  s.version          = '0.0.4'
  s.summary          = 'Ericsson Contextual Communication Cloud SDK'

  s.description      = <<-DESC
iOS SDK for building Ericsson Contextual Communication Cloud apps.
                       DESC

  s.homepage         = 'https://github.com/Ericsson/c3-ios-sdk'
  s.license          = { :type => 'BSD-2', :file => 'LICENSE' }
  s.author           = { 'Ericsson AB' => 'labs@ericsson.com' }
  s.source           = { :git => 'https://github.com/Ericsson/c3-ios-sdk.git', :tag => s.version.to_s }

  s.ios.deployment_target = '8.0'
  s.requires_arc = true

  s.vendored_frameworks = 'C3Lib/C3Lib.framework'
  
  s.dependency 'CryptoSwift', '~> 0.6.6'
  s.dependency 'MatrixSDK', '~> 0.7.1'
  s.dependency 'WebRTC', '~> 54.6.13869'
end
