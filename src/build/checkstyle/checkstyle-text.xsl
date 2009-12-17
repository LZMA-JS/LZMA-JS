<?xml version="1.0" encoding="ISO-8859-1"?>

<!-- $Id$ -->
<xsl:transform xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="text" media-type="text/plain"/>

    <xsl:param name="failed"/>
    <xsl:param name="show.warnings"/>
    <xsl:param name="filename.strip.prefix"/>

    <xsl:include href="templates.xsl"/>

    <xsl:template match="checkstyle">
        <xsl:variable name="warnings" select="count(file/error[@severity='warning'])"/>
        <xsl:variable name="errors" select="count(file/error[@severity='error'])"/>
        <xsl:variable name="result">
            <xsl:choose>
                <xsl:when test="$failed = 'true'">FAILED</xsl:when>
                <xsl:otherwise>SUCCEEDED</xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        <xsl:value-of select="concat('&#10;Checkstyle ', $result, ': ',
          $warnings, ' warning(s), ', $errors, ' error(s)&#10;&#10;')"/>
        <xsl:apply-templates/>
    </xsl:template>

    <xsl:template match="file">
        <xsl:if test="error[@severity='error' or ($show.warnings = 'true' and @severity='warning')]">
            <xsl:call-template name="strip-prefix">
                <xsl:with-param name="string" select="concat(@name, '&#10;')"/>
                <xsl:with-param name="prefix" select="$filename.strip.prefix"/>
            </xsl:call-template>
            <xsl:for-each select="error[@severity='error' or ($show.warnings = 'true' and @severity='warning')]">
                <xsl:value-of select="concat('  ', @line, ': ', @message, '&#10;')"/>
            </xsl:for-each>
        </xsl:if>
    </xsl:template>

    <xsl:template match="@*|node()">
        <xsl:apply-templates/>
    </xsl:template>

</xsl:transform>
