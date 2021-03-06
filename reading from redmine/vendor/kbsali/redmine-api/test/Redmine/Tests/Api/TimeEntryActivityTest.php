<?php

namespace Redmine\Tests\Api;

use Redmine\Api\TimeEntryActivity;

/**
 * @coversDefaultClass Redmine\Api\TimeEntryActivity
 * @author     Malte Gerth <mail@malte-gerth.de>
 */
class TimeEntryActivityTest extends \PHPUnit_Framework_TestCase
{
    /**
     * Test all()
     *
     * @covers ::all
     * @test
     *
     * @return void
     */
    public function testAllReturnsClientGetResponse()
    {
        // Test values
        $getResponse = 'API Response';

        // Create the used mock objects
        $client = $this->getMockBuilder('Redmine\Client')
            ->disableOriginalConstructor()
            ->getMock();
        $client->expects($this->once())
            ->method('get')
            ->with(
                $this->stringStartsWith('/enumerations/time_entry_activities.json')
            )
            ->willReturn($getResponse);

        // Create the object under test
        $api = new TimeEntryActivity($client);

        // Perform the tests
        $this->assertSame($getResponse, $api->all());
    }

    /**
     * Test all()
     *
     * @covers ::all
     * @test
     *
     * @return void
     */
    public function testAllReturnsClientGetResponseWithParameters()
    {
        // Test values
        $parameters = array('not-used');
        $getResponse = array('API Response');

        // Create the used mock objects
        $client = $this->getMockBuilder('Redmine\Client')
            ->disableOriginalConstructor()
            ->getMock();
        $client->expects($this->any())
            ->method('get')
            ->with(
                $this->logicalAnd(
                    $this->stringStartsWith('/enumerations/time_entry_activities.json'),
                    $this->stringContains('not-used')
                )
            )
            ->willReturn($getResponse);

        // Create the object under test
        $api = new TimeEntryActivity($client);

        // Perform the tests
        $this->assertSame($getResponse, $api->all($parameters));
    }
}
