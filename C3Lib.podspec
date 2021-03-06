#
# Be sure to run `pod lib lint C3Lib.podspec' to ensure this is a
# valid spec before submitting.
#
# Any lines starting with a # are optional, but their use is encouraged
# To learn more about a Podspec see http://guides.cocoapods.org/syntax/podspec.html
#

Pod::Spec.new do |s|
  s.name             = 'C3Lib'
  s.version          = '0.0.8'
  s.summary          = 'Ericsson Contextual Communication Cloud SDK'

  s.description      = <<-DESC
iOS SDK for building Ericsson Contextual Communication Cloud apps.
                       DESC

  s.homepage         = 'https://github.com/Ericsson/c3-ios-sdk'
  s.license          = { :type => 'BSD-2', :file => 'LICENSE' }
  s.author           = { 'Ericsson AB' => 'labs@ericsson.com' }
  s.source           = { :git => 'https://github.com/Ericsson/c3-ios-sdk.git', :tag => s.version.to_s }

  s.ios.deployment_target = '9.0'
  s.requires_arc = true

  s.vendored_frameworks = 'C3Lib/cct.framework'
  s.module_name = 'cct'
  
  s.dependency 'CryptoSwift', '~> 0.7.2'
  s.dependency 'JSCoreBom', '~> 1.1.1'
  s.dependency 'MatrixSDK', '~> 0.7.7'
  s.dependency 'WebRTC', '~> 61.5.19063'
end
