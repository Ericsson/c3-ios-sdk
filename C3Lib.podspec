#
# Be sure to run `pod lib lint C3Lib.podspec' to ensure this is a
# valid spec before submitting.
#
# Any lines starting with a # are optional, but their use is encouraged
# To learn more about a Podspec see http://guides.cocoapods.org/syntax/podspec.html
#

Pod::Spec.new do |s|
  s.name             = 'C3Lib'
  s.version          = '1.0.0'
  s.summary          = 'Contextual Communication Toolbox Library'

  s.description      = <<-DESC
TODO: Add long description of the pod here.
                       DESC

  s.homepage         = 'https://github.com/Ericsson/c3-ios-sdk'
  s.license          = { :type => 'Apache', :file => 'LICENSE' }
  s.author           = { 'Ericsson' => 'marcin.lukow@afconsult.com' }
  s.source           = { :git => 'https://github.com/Ericsson/c3-ios-sdk.git', :tag => s.version.to_s }

  s.ios.deployment_target = '8.0'
  s.requires_arc = true

  s.vendored_frameworks = 'C3Lib/C3Lib.framework'
  
  s.dependency 'CryptoSwift'
  s.dependency 'MatrixSDK'
  s.dependency 'WebRTC'
end
