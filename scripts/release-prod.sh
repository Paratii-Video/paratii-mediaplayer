#!/bin/bash
VERSION=${CIRCLE_TAG#release-v}

yarn tag add paratii-mediaplayer@$VERSION latest