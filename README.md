# WebRTC Study

## What is WebRTC?
> Real Time Communication

WebRTC is a public standard for video, voice, and data communication between web browsers without real-time, plug-in required. __<u>Direct communication between devices is possible with P2P, so the function and performance of the server are not required.</u>__

## WebRTC Structure

<img src="https://www.html5rocks.com/ko/tutorials/webrtc/basics/jsep.png">

> http://www.html5rocks.com/ko/tutorials/webrtc/basics/

Signaling enables communication between web browsers by exchanging 3 pieces of information between Apps.

* __Session Control message__: Proper communication initialization, termination, and error reporting between apps.
* __Network Configuration__: Exchange IP Address, Port
* __Media Capabilities__: Transfer available codecs and resolutions between web browsers.

## What is STUN & TURN Server?
> Session Traversal Utilities for NAT (STUN)
> Traversal Using Relays around NAT (TURN)

* As we know that webRTC is peer to peer and the ice candidates are mandatory in webrtc. ICE functionality can be in any of the two ways , STUN and TURN.

* STUN servers are used by both clients to determine their IP address as visible by the global Internet.If both the peers are behind the same NAT , STUN settings are not needed since they are anyways reachable form each other . STUN effectively comes into play when the peers are on different networks.

* However, addresses obtained by STUN may not be usable by all peers. Those addresses work depending on the topological conditions of the network. Therefore, STUN by itself cannot provide a complete solution for NAT traversal.

* A complete solution requires a means by which a client can obtain a transport address from which it can receive media from any peer which can send packets to the public Internet. This can only be accomplished by relaying data through a server that resides on the public Internet. TURN is a protocol that allows a client to obtain IP addresses and ports from such a relay.


## Reference

* __TURN Wikipedia__ : https://en.wikipedia.org/wiki/Traversal_Using_Relays_around_NAT

* __WebRTC__: http://www.hellonms.net/blog.do?mode=view&startNo=0&bbs_id=5
